import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

import { auth } from "../firebase";
import { signOut } from "@firebase/auth";
import { userCol, db } from "../firebase";
import { getDocs, query, where, updateDoc, doc } from "firebase/firestore";

import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import * as ImagePicker from "expo-image-picker";

export default function User({ navigation }) {
  const user = auth;

  const [currentUser, setCurrentUser] = useState();

  const handleSIgnOut = () => {
    signOut(auth).then(() => {
      navigation.replace("Login");
    });
  };

  const fetchUserData = () => {
    const q = query(userCol, where("id", "==", user.currentUser.uid));

    getDocs(q)
      .then((snapshot) => {
        const users = [];
        snapshot.docs.forEach((doc) => {
          users.push({ ...doc.data(), docID: doc.id });
        });
        setCurrentUser(users[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const showSuccessToast = () => {
    Toast.show({
      type: "success",
      text1: "Uploaded Successfully",
    });
  };

  const updateProfilePic = (url, docID) => {
    const docRef = doc(db, "users", docID);
    updateDoc(docRef, { photoUrl: url }).then(() => {
      fetchUserData();
      showSuccessToast();
    });
  };

  const handleUploadProfile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const img = result.assets[0].uri;
      const imgRef = ref(storage, `profile/${img}`);

      const imgFetch = await fetch(img);
      const bytes = await imgFetch.blob();

      uploadBytes(imgRef, bytes).then(() => {
        getDownloadURL(imgRef).then((url) => {
          updateProfilePic(url, currentUser.docID);
        });
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <View
        style={{
          backgroundColor: currentUser
            ? currentUser.role === "admin"
              ? "black"
              : "#CC0000"
            : "#CC0000",
          width: "100%",
          minHeight: 150,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View>
          {currentUser ? (
            <Image
              source={{
                uri: currentUser.photoUrl,
              }}
              style={{
                width: 130,
                height: 130,
                borderRadius: 100,
                marginBottom: -40,
              }}
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
      <View style={{ marginTop: 45 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
          {currentUser ? (
            currentUser.firstName + " " + currentUser.lastName
          ) : (
            <ActivityIndicator />
          )}
        </Text>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          {/* <TouchableOpacity
              style={{
                backgroundColor: "#CC0000",
                paddingHorizontal: 5,
                paddingVertical: 3,
                borderRadius: 10,
                marginTop: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
                Message
              </Text>
            </TouchableOpacity> */}
          <TouchableOpacity onPress={handleUploadProfile}>
            <Text
              style={{
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 3,
                borderRadius: 10,
                marginTop: 5,
              }}
            >
              Upload Profile <Feather name="upload" size={24} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            marginVertical: 10,
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={{ fontSize: 15 }}>First Name: </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text
              style={{
                borderBottomWidth: 2,
                borderColor: "#CC0000",
                marginLeft: 10,
              }}
            >
              {currentUser ? currentUser.firstName : <ActivityIndicator />}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginVertical: 10,
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={{ fontSize: 15 }}>Last Name: </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text
              style={{
                borderBottomWidth: 2,
                borderColor: "#CC0000",
                marginLeft: 10,
              }}
            >
              {currentUser ? currentUser.lastName : <ActivityIndicator />}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginVertical: 10,
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={{ fontSize: 15 }}>Email: </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text
              style={{
                borderBottomWidth: 2,
                borderColor: "#CC0000",
                marginLeft: 10,
              }}
            >
              {currentUser ? user.currentUser.email : <ActivityIndicator />}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginVertical: 10,
          }}
        >
          <View style={{ width: 100 }}>
            <Text style={{ fontSize: 15 }}>Address: </Text>
          </View>
          <View style={{ width: 200 }}>
            <Text
              style={{
                borderBottomWidth: 2,
                borderColor: "#CC0000",
                marginLeft: 10,
              }}
            >
              {currentUser ? currentUser.address : <ActivityIndicator />}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Pressable
            style={{
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleSIgnOut}
          >
            <Text
              style={{
                textAlign: "center",
                borderWidth: 1,
                paddingHorizontal: 10,
                fontSize: 20,
                fontWeight: "bold",
                color: "#46B950",
                borderColor: "#46B950",
                borderRadius: 5,
                marginRight: 10,
              }}
            >
              SAVE
            </Text>
          </Pressable> */}
        <Pressable
          style={{
            marginVertical: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={handleSIgnOut}
        >
          <Text
            style={{
              textAlign: "center",
              borderWidth: 1,
              paddingHorizontal: 10,
              fontSize: 20,
              fontWeight: "bold",
              color: "#CC0000",
              borderColor: "#CC0000",
              borderRadius: 5,
            }}
          >
            LOGOUT
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
