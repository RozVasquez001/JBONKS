import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Header from "../components/header";

import { SafeAreaView } from "react-native-safe-area-context";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
export default function ViewALl({ navigation }) {
  const [data, setData] = useState();

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

  const getProducts = async () => {
    const productsRef = collection(db, "products");
    onSnapshot(productsRef, (snapshot) => {
      const products = [];
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), docID: doc.id });
      });
      setData(products);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f8f8f8",
      }}
    >
      <Header navigation={navigation} />
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 10,
          }}
        >
          All Products
        </Text>
      </View>
      <View style={{ height: "90%", width: "100%" }}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 150 }}
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          initialNumToRender={5}
          maxToRenderPerBatch={10}
        />
      </View>
    </SafeAreaView>
  );
}
