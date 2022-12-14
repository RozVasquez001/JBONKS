import {
  View,
  Text,
  Pressable,
  ImageBackground,
  Dimensions,
  Modal,
  TouchableOpacity,
  Alert,
  TextInput,
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

  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [barrangay, setBarrangay] = useState();
  const [pruok, setPruok] = useState();
  const [address, setAddress] = useState();

  const [showAddressModal, setShowAddressModal] = useState(false);

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
    } else if (address === undefined) {
      return "You need to setup your address!";
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
            address: address,
            id: user.user.uid,
            firstName: firstName,
            lastName: lastName,
            role: "customer",
            photoUrl:
              "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg",
          });
          showSuccessToast("Registered Successfully!");
          setLoading(false);
          navigation.navigate("Login");
        })
        .catch((error) => {
          showErrorToast(error.code);
          setLoading(false);
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

  const handleSubmitAddress = () => {
    if (
      province === undefined ||
      city === undefined ||
      barrangay === undefined ||
      pruok === undefined
    ) {
      showErrorToast("All fields must not be empty");
    } else {
      const output = pruok + " " + barrangay + " " + city + " " + province;
      setProvince(undefined);
      setCity(undefined);
      setBarrangay(undefined);
      setPruok(undefined);
      setAddress(output);
      showSuccessToast("Setup address successfully");
      setShowAddressModal(false);
    }
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
          <AuthButton
            text="Add New Address"
            handlePress={() => setShowAddressModal(true)}
          />

          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#FF7C7E", fontSize: 15, marginTop: 10 }}>
              Already have an account?
            </Text>
          </Pressable>

          <AuthButton text="SIGN UP" handlePress={handleSignUp} />
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddressModal}
        onRequestClose={() => {
          setShowAddressModal(!showAddressModal);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#00000099",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "80%",
              width: "100%",
              backgroundColor: "white",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Province
                </Text>
                <TextInput
                  onChangeText={(text) => setProvince(text)}
                  placeholder="eg: Camarines Norte"
                  style={{
                    borderBottomWidth: 2,
                    width: "90%",
                    borderBottomColor: "#CC0000",
                  }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Municipality
                </Text>
                <TextInput
                  onChangeText={(text) => setCity(text)}
                  placeholder="eg: Daet"
                  style={{
                    borderBottomWidth: 2,
                    width: "90%",
                    borderBottomColor: "#CC0000",
                  }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Barangay
                </Text>
                <TextInput
                  onChangeText={(text) => setBarrangay(text)}
                  placeholder="eg: Pamorangon"
                  style={{
                    borderBottomWidth: 2,
                    width: "90%",
                    borderBottomColor: "#CC0000",
                  }}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  Street Number / Purok
                </Text>
                <TextInput
                  onChangeText={(text) => setPruok(text)}
                  placeholder="eg: Purok-3"
                  style={{
                    borderBottomWidth: 2,
                    width: "90%",
                    borderBottomColor: "#CC0000",
                  }}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleSubmitAddress}
                  style={{
                    backgroundColor: "#CC0000",
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Add Address</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
