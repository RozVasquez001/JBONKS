import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AuthTextInput from "../components/AuthTextInput";
import AuthButton from "../components/AuthButton";

import Toast from "react-native-toast-message";
import { auth } from "../firebase";
import { userCol } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
  const [loading, setLoading] = useState(false);

  const handleError = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (firstName === "" || firstName === undefined) {
      return "Please input your first name.";
    } else if (lastName === "" || lastName === undefined) {
      return "Please input your last name.";
    } else if (email === "" || email === undefined) {
      return "Please input your email.";
    } else if (!reg.test(email)) {
      return "Please input a proper email address";
    } else if (pass === "" || pass === undefined) {
      return "Password is empty";
    } else if (pass !== pass2) {
      return "Password did'nt Match";
    } else if (pass.length < 8) {
      return "Password must be longer than 8 characters";
    } else {
      return false;
    }
  };

  const handleSignUp = () => {
    const result = handleError();

    if (result !== false) {
      showErrorToast(result);
    } else {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, pass)
        .then((user) => {
          addDoc(userCol, {
            id: user.user.uid,
            firstName: firstName,
            lastName: lastName,
            role: "customer",
            photoUrl:
              "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
          });
          showSuccessToast();
          setLoading(false);
          navigation.navigate("Login");
        })
        .catch((error) => {
          showErrorToast(error.code);
          setLoading(false);
        });
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Registered Successfully",
    });
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
          Register
        </Text>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <AuthTextInput
              style={{
                width: Dimensions.get("screen").width * 0.45,
                paddingHorizontal: 0,
                marginHorizontal: 10,
              }}
              placeHolder="First name"
              secured={false}
              onChange={(text) => setFirstName(text)}
            />
            <AuthTextInput
              style={{
                width: Dimensions.get("screen").width * 0.45,
                paddingHorizontal: 0,
              }}
              placeHolder="Last name"
              secured={false}
              onChange={(text) => setLastName(text)}
            />
          </View>
          <AuthTextInput
            onChange={(text) => setEmail(text)}
            style={{ marginTop: 15 }}
            placeHolder="Email"
            entypoIconName="mail"
            type="emailAddress"
            secured={false}
          />
          <AuthTextInput
            onChange={(text) => setPass(text)}
            style={{ marginVertical: 15 }}
            placeHolder="Password"
            entypoIconName="lock"
            secured={true}
          />
          <AuthTextInput
            onChange={(text) => setPass2(text)}
            placeHolder="Re-type password"
            entypoIconName="lock"
            secured={true}
          />
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#FF7C7E", fontSize: 15, marginTop: 10 }}>
              Already have an account?
            </Text>
          </Pressable>

          <AuthButton text="SIGN UP" handlePress={handleSignUp} />
        </View>
      </View>
    </SafeAreaView>
  );
}
