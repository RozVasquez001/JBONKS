import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";
import Header from "../components/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreLocation({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
            marginVertical: 10,
          }}
        >
          Store Location{" "}
        </Text>
      </View>
      <WebView
        source={{
          html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3869.4010884888003!2d122.95108287405334!3d14.112494188842557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3398ae57975f9aaf%3A0x13e31c32b8d63164!2sJybon%20Inasal!5e0!3m2!1sen!2sph!4v1670323850695!5m2!1sen!2sph" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        }}
      />
    </SafeAreaView>
  );
}
