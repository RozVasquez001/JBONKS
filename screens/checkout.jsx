import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function Checkout({ navigation, route }) {
  const { toCheckout: productToCheckout } = route.params;
  const currentUser = productToCheckout[0].owner;
  const totalPrice = route.params.total;

  const [orderType, setOrderType] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [orderRequest, setOrderRequest] = useState();

  const MailDesign = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#C41440" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
        <View
          style={{ height: 7, width: 15, backgroundColor: "#008AAC" }}
        ></View>
        <View style={{ height: 7, width: 15, backgroundColor: "white" }}></View>
      </View>
    );
  };

  const handleConfirmOrder = () => {
    if (orderType === undefined) {
      showErrorToast("Please specify your order type");
    } else if (paymentMethod === undefined) {
      showErrorToast("Please select a payment method");
    } else if (paymentMethod === "card") {
      showErrorToast("Payment Method: Credit/Debit Card will coming soon");
    } else if (paymentMethod === "gcash") {
      showErrorToast("Payment Method: Gcash will coming soon");
    } else {
      const ordersRef = collection(db, "orders");
      addDoc(ordersRef, {
        owner: currentUser,
        orderType: orderType,
        paymentMethod: paymentMethod,
        products: productToCheckout,
        orderStatus: "pending",
        totalPrice: totalPrice,
        orderRequest: orderRequest === undefined ? "No Request" : orderRequest,
      }).then(() => {
        navigation.replace("OrderConfirmed");
      });
    }
  };

  const showSuccessToast = (text) => {
    Toast.show({
      type: "success",
      text1: text,
    });
  };

  const showErrorToast = (text) => {
    Toast.show({
      type: "error",
      text1: text,
    });
  };

  const renderProductToCheckout = ({ item }) => {
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
            <Image
              source={{ uri: item.product.productPhotoUrl }}
              style={{ width: 70, height: 70, marginHorizontal: 5 }}
              resizeMode="contain"
            />
            <View style={{ width: "50%", marginHorizontal: 5 }}>
              <Text numberOfLines={2}>{item.product.title}</Text>
            </View>
            <View>
              <Text style={{ color: "#CC0000", fontWeight: "bold" }}>
                ₱{item.product.price}
              </Text>
              <Text style={{ color: "gray", fontWeight: "bold" }}>
                x{item.quantity}
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
          ></View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: "#f8f8f8", padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
            marginBottom: 5,
          }}
        >
          <Feather name="map-pin" size={15} color="#CC0000" />
          <Text style={{ fontSize: 15, color: "#CC0000" }}>
            Delivery Address
          </Text>
        </View>
        <View>
          <Text style={{ color: "gray", fontSize: 16, textAlign: "center" }}>
            {currentUser.address}
          </Text>
        </View>
      </View>
      <MailDesign />

      <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 5 }}>
        Orders
      </Text>
      {productToCheckout && (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{
            height: "30%",
            paddingVertical: 10,

            backgroundColor: "#CC0000",
          }}
          data={productToCheckout}
          renderItem={renderProductToCheckout}
          keyExtractor={(item, index) => index}
        />
      )}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ marginLeft: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>Order Type</Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Checkbox
                  value={orderType === "delivery" ? true : false}
                  onValueChange={() => setOrderType("delivery")}
                  color={orderType === "delivery" ? "#CC0000" : undefined}
                />
                <Text style={{ marginLeft: 5 }}>Delivery</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <Checkbox
                  value={orderType === "pickup" ? true : false}
                  onValueChange={() => setOrderType("pickup")}
                  color={orderType === "pickup" ? "#CC0000" : undefined}
                />
                <Text style={{ marginLeft: 5 }}>Pickup (30 minutes)</Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, margin: 10 }}>
            <TextInput
              placeholder="Order Request (eg: Extra rice/sabaw"
              onChangeText={(text) => setOrderRequest(text)}
              style={{
                borderWidth: 1,
                borderColor: "#CC0000",
                minHeight: 30,
                borderRadius: 10,
                width: "100%",
                textAlignVertical: "top",
                padding: 10,
              }}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Payment Method
          </Text>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Checkbox
                value={paymentMethod === "cod" ? true : false}
                onValueChange={() => setPaymentMethod("cod")}
                color={paymentMethod === "cod" ? "#CC0000" : undefined}
              />
              <Text style={{ marginLeft: 5 }}>Cash on Delivery</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Checkbox
                value={paymentMethod === "gcash" ? true : false}
                onValueChange={() => setPaymentMethod("gcash")}
                color={paymentMethod === "gcash" ? "#CC0000" : undefined}
              />
              <Text style={{ marginLeft: 5 }}>
                Gcash <Text style={{ color: "gray" }}>(Coming soon)</Text>
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 5,
              }}
            >
              <Checkbox
                value={paymentMethod === "card" ? true : false}
                onValueChange={() => setPaymentMethod("card")}
                color={paymentMethod === "card" ? "#CC0000" : undefined}
              />
              <Text style={{ marginLeft: 5 }}>
                Credit/Debit Card{" "}
                <Text style={{ color: "gray" }}>(Coming soon)</Text>
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text>
              Total Price:{" "}
              <Text style={{ fontWeight: "bold", color: "#CC0000" }}>
                ₱{totalPrice}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={handleConfirmOrder}
              style={{
                backgroundColor: "#CC0000",
                paddingVertical: 5,
                paddingHorizontal: 10,
                margin: 10,
              }}
            >
              <Text style={{ color: "white" }}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
