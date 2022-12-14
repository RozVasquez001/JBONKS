import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default function OrderConfirmed({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#CC0000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <AntDesign name="checkcircleo" size={100} color="white" />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 30,
            marginTop: 10,
          }}
        >
          ORDER CONFIRMED
        </Text>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{
              borderWidth: 1,
              borderColor: "white",
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Home
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
