import {
  View,
  Text,
  Pressable,
  ImageBackground,
  BackHandler,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AuthTextInput from "../components/AuthTextInput";
import AuthButton from "../components/AuthButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Loading from "../components/Loading";

export default function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    // onAuthStateChanged(auth, () => {
    //   if (auth.currentUser) {
    //     navigation.replace("DrawerTab");
    //   }
    // });
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  });

  const handleError = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === "" || email === undefined) {
      return "Please input your email.";
    } else if (!reg.test(email)) {
      return "Please input a proper email address";
    } else if (pass === "" || pass === undefined) {
      return "Password is empty";
    } else {
      return false;
    }
  };

  const handleSignIn = () => {
    Keyboard.dismiss();

    handleError();
    const result = handleError();

    if (result !== false) {
      showErrorToast(result);
    } else {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
          navigation.replace("DrawerTab");
          setLoading(false);
        })
        .catch((error) => {
          showErrorToast(error.code);
          setLoading(false);
        });
    }
  };

  const showErrorToast = (text) => {
    Toast.show({
      type: "error",
      text1: text,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {loading && <Loading />}
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
          <AuthButton text="LOGIN" handlePress={handleSignIn} />
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
