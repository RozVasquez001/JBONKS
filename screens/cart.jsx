import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db, userCol } from "../firebase";
import Loading from "../components/Loading";

import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function Cart({ navigation, route }) {
  const currentUser = route.params;

  const [selectAll, setSelectAll] = useState(false);

  const [cart, setCart] = useState();

  const handleIncreament = (item) => {
    const data = [...cart];
    const newData = data.map((i) => {
      if (i.id === item.id) {
        i.quantity = i.quantity + 1;
      }
      return i;
    });
    setCart(newData);
  };

  const handleDecrement = (item) => {
    const data = [...cart];
    const newData = data.map((i) => {
      if (i.id === item.id) {
        i.quantity = i.quantity - 1;
      }
      return i;
    });
    setCart(newData);
  };

  const handleAddToCart = (item) => {
    const data = [...cart];
    const newData = data.map((i) => {
      if (i.id === item.id) {
        i.addedToCart = !i.addedToCart;
      }
      return i;
    });
    setCart(newData);
  };

  const handleTotal = () => {
    const data = [...cart];
    let total = 0;
    data.map((i) => {
      if (i.addedToCart) {
        total += i.product.price * i.quantity;
      }
    });
    return parseInt(total);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const data = [...cart];
    const newData = data.map((i) => {
      if (selectAll) {
        i.addedToCart = false;
      } else {
        i.addedToCart = true;
      }
      return i;
    });

    setCart(newData);
  };

  const handleDelete = (item) => {
    const itemDoc = doc(db, "carts", item.id);
    deleteDoc(itemDoc).then(() => {
      Toast.show({
        type: "success",
        text1: "Deleted Successfully",
      });
    });
  };

  const handleCheckout = () => {
    if (toCheckout.length > 0) {
      navigation.navigate("Checkout", {
        toCheckout: toCheckout,
        total: handleTotal(),
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Please select an item first",
      });
    }
  };

  const renderCarts = ({ item }) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            minHeight: 100,
            flexDirection: "column",
            padding: 10,
            marginVertical: 5,
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Checkbox
              value={item.addedToCart}
              onValueChange={() => handleAddToCart(item)}
              color={item.addedToCart ? "#CC0000" : undefined}
            />
            <Image
              source={{ uri: item.product.productPhotoUrl }}
              style={{ width: 70, height: 70, marginHorizontal: 5 }}
              resizeMode="contain"
            />
            <View style={{ width: "50%", marginHorizontal: 5 }}>
              <Text numberOfLines={2}>{item.product.title}</Text>
              <Text style={{ color: "#CC0000", fontWeight: "bold" }}>
                ₱{item.product.price}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                padding: 5,
              }}
            >
              <TouchableHighlight
                onPress={() => handleDelete(item)}
                style={{
                  backgroundColor: "#CC0000",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Remove</Text>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button
                color={"#CC0000"}
                title="-"
                disabled={item.quantity === 1 ? true : false}
                onPress={() => handleDecrement(item)}
              ></Button>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {item.quantity}
              </Text>
              <Button
                color={"#CC0000"}
                onPress={() => handleIncreament(item)}
                title="+"
              ></Button>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const fetchCarts = () => {
    const cartsRef = collection(db, "carts");
    onSnapshot(cartsRef, (snapshot) => {
      const carts = [];
      snapshot.docs.forEach((doc) => {
        carts.push({ ...doc.data(), id: doc.id });
      });
      const filteredCarts = carts.filter((i) => {
        if (i.owner.id === currentUser.id) {
          return i;
        }
      });
      setCart(filteredCarts);
    });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (cart === undefined || cart.length === 0) {
    return (
      <View
        style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}
      >
        <Text style={{ fontSize: 25, color: "gray", marginTop: 30 }}>
          Your cart is empty
        </Text>
      </View>
    );
  }

  const toCheckout = cart.filter((i) => {
    if (i.addedToCart) {
      return i;
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {cart && (
        <>
          <FlatList
            style={{ marginBottom: 30 }}
            data={cart}
            renderItem={renderCarts}
            keyExtractor={(item, index) => index}
          />

          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: 50,
              position: "absolute",
              bottom: 0,
              left: 0,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ marginRight: 5 }}>Select All</Text>
              <Checkbox
                value={selectAll}
                onValueChange={handleSelectAll}
                color={selectAll ? "#CC0000" : undefined}
              />
              <Text style={{ marginHorizontal: 10 }}>
                Total:{" "}
                <Text style={{ color: "#E6141C" }}>₱{handleTotal()}</Text>
              </Text>
            </View>

            <Pressable onPress={handleCheckout}>
              <View
                style={{
                  backgroundColor: "#E6141C",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </View>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
