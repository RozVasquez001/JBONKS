import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/header";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, db, userCol } from "../firebase";
import Loading from "../components/Loading";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function Home({ navigation }) {
  const [itemDATA, setItemDATA] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState();
  const [currentUser, setCurrentUser] = useState();

  const user = auth;

  const fetchUserData = () => {
    const q = query(userCol, where("id", "==", user.currentUser.uid));

    onSnapshot(q, (snapshot) => {
      const users = [];
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), docID: doc.id });
      });
      setCurrentUser(users[0]);
    });
  };

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
    fetchUserData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("ViewItem", { ...item })}>
        <View
          style={{
            width: Dimensions.get("window").width * 0.47,
            height: Dimensions.get("window").width * 0.6,
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
            }}
          >
            <Image
              source={{ uri: item.productPhotoUrl }}
              style={{ width: "80%", height: "80%", borderRadius: 10 }}
              resizeMode="cover"
            />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text
              numberOfLines={1}
              style={{ fontSize: 15, fontWeight: "bold" }}
            >
              {item.title}
            </Text>
            <Text style={{ color: "#CC0000", marginVertical: 2 }}>
              ₱{item.price}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            ></View>
          </View>
        </View>
      </Pressable>
    );
  };

  const onRefresh = () => {
    getProducts();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      {currentUser && currentUser.role === "admin" && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            margin: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Sell")}
            style={{
              backgroundColor: "#CC0000",
              padding: 5,
              borderRadius: 5,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 20, marginRight: 5 }}>
              Admin Dashboard
            </Text>
            <MaterialIcons
              name="admin-panel-settings"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 10,
          }}
        >
          Customer Picks
        </Text>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={itemDATA}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        initialNumToRender={10}
      />
    </SafeAreaView>
  );
}
