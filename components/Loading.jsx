import { View, Text, Actobo, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View
      style={{
        backgroundColor: "#CC000099",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 99,
      }}
    >
      <ActivityIndicator size="large" color="white" />
      <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
        Loading
      </Text>
    </View>
  );
}
