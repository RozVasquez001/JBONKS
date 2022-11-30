import { View, Text, Pressable, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AuthTextInput from "../components/AuthTextInput";
import AuthButton from "../components/AuthButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/jbonkslogo.png")}
        resizeMode="contain"
        style={{
          flex: 1,
          backgroundColor: "#CC0000",
          borderBottomRightRadius: 50,
          borderBottomLeftRadius: 50,
        }}
      ></ImageBackground>

      <View style={{ flex: 2 }}>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 10,
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          LOGIN
        </Text>
        <View style={{ alignItems: "center" }}>
          <AuthTextInput
            style={{ marginVertical: 15 }}
            placeHolder="Email"
            entypoIconName="mail"
            secured={false}
            onChange={(text) => {
              setEmail(text);
            }}
          />
          <AuthTextInput
            placeHolder="Password"
            entypoIconName="lock"
            secured={true}
            onChange={(text) => {
              setPass(text);
            }}
          />
          <Pressable onPress={() => console.warn("fdf")}>
            <Text style={{ color: "#FF7C7E", fontSize: 15, marginTop: 10 }}>
              Forget Password?
            </Text>
          </Pressable>
          <AuthButton text="LOGIN" />
          <Text style={{ color: "gray", marginVertical: 10 }}>or</Text>
          <AuthButton
            text="SIGNUP"
            handlePress={() => navigation.navigate("Signup")}
            style={{ marginTop: 0 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
