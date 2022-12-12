import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Pressable,
  Alert,
  Dimensions,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { TextInput } from "react-native-gesture-handler";
import { userCol, db, auth } from "../firebase";
import {
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  onSnapshot,
  collection,
  addDoc,
} from "firebase/firestore";

export default function ViewItem({ route }) {
  const data = route.params;
  const [addCart, setAddCart] = useState(false);

  const user = auth;
  const [currentUser, setCurrentUser] = useState();
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddToCart = () => {
    const output = {
      quantity: quantity,
      product: data,
      owner: currentUser,
    };

    const cartsRef = collection(db, "carts");
    addDoc(cartsRef, output).then(() => {
      showSuccessToast();
    });
  };

  const showSuccessToast = () => {
    setAddCart(false);
    Toast.show({
      type: "success",
      text1: "Added to cart!",
    });
  };

  const showErrorToast = (text) => {
    setAddCart(false);
    Toast.show({
      type: "error",
      text1: text,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addCart}
        onRequestClose={() => setAddCart(false)}
      >
        <View
          style={{
            backgroundColor: "#00000030",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: Dimensions.get("window").height * 0.6,
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}
          >
            <View
              style={{
                margin: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: data.productPhotoUrl }}
              />
              <View
                style={{ justifyContent: "center", alignItems: "flex-start" }}
              >
                <Text
                  style={{ color: "#CC0000", fontWeight: "bold", fontSize: 30 }}
                >
                  ₱{data.price}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "gray" }}>Quantity</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  color={"#CC0000"}
                  title="-"
                  disabled={quantity === 1 ? true : false}
                  onPress={() => setQuantity(quantity - 1)}
                ></Button>
                <Text
                  style={{
                    paddingHorizontal: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {quantity}
                </Text>
                <Button
                  color={"#CC0000"}
                  onPress={() => setQuantity(quantity + 1)}
                  title="+"
                ></Button>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Pressable
                onPress={handleAddToCart}
                style={{
                  backgroundColor: "#46B950",
                  width: "90%",
                  paddingVertical: 15,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  ADD TO CART{" "}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: "#f8f8f430",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: data.productPhotoUrl }}
          style={{ width: "70%", height: "70%" }}
        />
      </View>
      <ScrollView
        style={{
          position: "relative",
          backgroundColor: "white",
          flex: 1.5,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}
      >
        <View style={{ margin: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "70%" }}>
              <Text style={{ fontSize: 23, fontWeight: "bold" }}>
                {data.title}
              </Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: 30, fontWeight: "bold", color: "#CC0000" }}
              >
                ₱{data.price}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 5,
                fontSize: 20,
                marginVertical: 10,
              }}
            >
              Description
            </Text>
            <Text style={{ fontSize: 15, color: "gray" }}>
              {data.description}
            </Text>
          </View>
          {/* <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 5,
                fontSize: 20,
                marginVertical: 10,
              }}
            >
              Reviews
            </Text>
            <Text style={{ fontSize: 15, color: "gray" }}>
              {data.description}
            </Text>
          </View> */}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => setAddCart(true)}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          padding: 15,
          borderRadius: 100,
          backgroundColor: "#CC0000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="cart-plus" size={24} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
