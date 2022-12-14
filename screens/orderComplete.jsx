import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db, userCol } from "../firebase";
import Loading from "../components/Loading";

import { Toast } from "react-native-toast-message/lib/src/Toast";
export default function OrderComplete() {
  const [orders, setOrders] = useState([]);
  const user = auth;
  const [currentUser, setCurrentUser] = useState();

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

  const fetchOrders = () => {
    const orderRef = collection(db, "orders");

    onSnapshot(orderRef, (snapshot) => {
      const orders = [];
      snapshot.docs.forEach((doc) => {
        orders.push({ ...doc.data(), id: doc.id });
      });
      setOrders(orders);
    });
  };

  const handleApprove = (item) => {
    const orderDoc = doc(db, "orders", item.id);
    updateDoc(orderDoc, {
      orderStatus: "processing",
    }).then(() => {
      Toast.show({
        type: "success",
        text1: "Success!",
      });
    });
  };

  const handleReject = (item) => {
    const orderDoc = doc(db, "orders", item.id);
    deleteDoc(orderDoc).then(() => {
      Toast.show({
        type: "success",
        text1: "Success!",
      });
    });
  };

  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);
  const ordersFiltered = orders.filter((i) => {
    if (i.owner.id === currentUser.id) {
      return i;
    }
  });

  const compelteOrders = ordersFiltered.filter((i) => {
    if (i.orderStatus === "completed") {
      return i;
    }
  });

  const adminCompelteOrders = orders.filter((i) => {
    if (i.orderStatus === "completed") {
      return i;
    }
  });

  if (ordersFiltered === undefined) {
    return <Loading />;
  }

  if (currentUser) {
    if (ordersFiltered.length === 0 && currentUser.role !== "admin") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "gray", fontSize: 25 }}>
            You don't have any orders
          </Text>
        </View>
      );
    }
  }

  const renderOrder = ({ item }) => {
    const renderProduct = ({ item }) => {
      return (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginHorizontal: 2 }}>₱{item.product.price}</Text>

            <Text style={{ marginHorizontal: 2 }}>{item.product.title}</Text>
            <Text style={{ marginHorizontal: 4 }}>x{item.quantity}</Text>
          </View>
        </View>
      );
    };

    return (
      <View
        style={{ backgroundColor: "white", padding: 10, marginVertical: 5 }}
      >
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Order Details
          </Text>
          <View>
            <Text>
              Customer:{" "}
              <Text style={{ color: "#CC0000" }}>
                {item.owner.firstName + " " + item.owner.lastName}
              </Text>
            </Text>
            <Text>
              Address:{" "}
              <Text style={{ color: "#CC0000" }}>{item.owner.address}</Text>
            </Text>
            <Text>
              Order Type:{" "}
              <Text style={{ color: "#CC0000" }}>{item.orderType}</Text>
            </Text>
            <Text>
              Payment Method:{" "}
              <Text style={{ color: "#CC0000" }}>
                {item.paymentMethod === "cod" ? "Cash on Delivery" : "Loading"}
              </Text>
            </Text>
            <Text>
              Order Request{" "}
              <Text style={{ color: "#CC0000" }}>{item.orderRequest}</Text>
            </Text>
          </View>
        </View>
        <FlatList
          data={item.products}
          keyExtractor={(item, index) => index}
          renderItem={renderProduct}
        />
        <View
          style={{
            marginVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: "#CC0000", fontWeight: "bold" }}>
            <Text style={{ color: "gray" }}>Total Price: </Text>₱
            {item.totalPrice}
          </Text>
          <Text>
            Order Status: {"  "}
            <Text style={{ color: "green", marginLeft: 5 }}>
              {item.orderStatus === "completed" ? "Delivered" : "Loading"}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      {currentUser && (
        <FlatList
          data={
            currentUser.role === "admin" ? adminCompelteOrders : compelteOrders
          }
          keyExtractor={(item, index) => index}
          renderItem={renderOrder}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}
