import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import AuthTextInput from "../components/AuthTextInput";
import { db } from "../firebase";

export default function Search({ navigation }) {
  const [itemDATA, setItemDATA] = useState([]);
  const [search, setSearch] = useState();
  const [refreshing, setRefreshing] = useState();

  const getProducts = async () => {
    const productsRef = collection(db, "products");
    onSnapshot(productsRef, (snapshot) => {
      const products = [];
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), docID: doc.id });
      });
      setItemDATA(products);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onRefresh = () => {
    getProducts();
  };

  const queriedData = itemDATA.filter((i) => {
    if (i.title.startsWith(search)) {
      return i;
    }
  });

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("ViewItem", { ...item })}>
        <View
          style={{
            width: Dimensions.get("window").width * 0.47,
            height: Dimensions.get("window").width * 0.7,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 5,
            margin: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 2,
            }}
          >
            <Image
              source={{ uri: item.productPhotoUrl }}
              style={{ width: "80%", height: "80%", borderRadius: 10 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginLeft: 10, flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#4FBCDD", marginVertical: 2 }}>
              ₱{item.price}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <AuthTextInput
          onChange={(text) => setSearch(text)}
          style={{
            marginVertical: 15,
            borderWidth: 1,
            backgroundColor: "white",
          }}
          placeHolder="Search Product"
          entypoIconName="magnifying-glass"
          secured={false}
        />
      </View>

      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={queriedData}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}
