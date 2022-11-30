import { Text, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function AuthButton({
  text,
  style,
  hasIcon,
  iconName,
  iconColor,
  handlePress,
}) {
  return (
    <Pressable
      onPress={handlePress}
      style={[
        {
          marginTop: 20,
          backgroundColor: "#FE3E3F",
          paddingVertical: 10,
          paddingHorizontal: 80,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
        },
        { ...style },
      ]}
    >
      {hasIcon && (
        <AntDesign
          style={{ marginHorizontal: 10 }}
          name={iconName}
          size={24}
          color={iconColor}
        />
      )}
      <Text style={{ color: "white" }}>{text}</Text>
    </Pressable>
  );
}
