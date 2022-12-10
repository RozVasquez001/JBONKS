import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/login";
import Signup from "./screens/signup";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Home from "./screens/home";
import User from "./screens/user";
import Sell from "./screens/sell";
import ViewItem from "./screens/viewItem";
import Cart from "./screens/cart";
import Search from "./screens/search";
import ViewALl from "./screens/viewAll";
import StoreLocation from "./screens/storeLocation";
import MyOrder from "./screens/orderPending";
import Orders from "./screens/orderPending";
import Checkout from "./screens/checkout";
import OrderConfirmed from "./screens/orderConfirmed";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrderPending from "./screens/orderPending";
import OrderProcess from "./screens/orderProcess";
import OrderProcessed from "./screens/orderProcessed";
import OrderComplete from "./screens/orderComplete";




export default function App() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator()
  const Admin = createBottomTabNavigator()
  const Order = createMaterialTopTabNavigator()
  

  const OrderTab = () => {
    return(
      <Order.Navigator screenOptions={{
        tabBarActiveTintColor: "#CC0000"
      }}>
        <Order.Screen options={{title: "Pending"}}   name="OrderPending" component={OrderPending} />
        <Order.Screen   options={{title: "On Process"}}  name="OrderProcess" component={OrderProcess} />
        <Order.Screen   options={{title: "To Deliver/Pickup"}}  name="OrderProcessed" component={OrderProcessed} />
        <Order.Screen   options={{title: "Delivered"}}  name="OrderComplete" component={OrderComplete} />

      </Order.Navigator>
    )
  }

  const DrawerTab = () => {
    return (
      <Drawer.Navigator  screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#CC0000",
        },

        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
        drawerActiveBackgroundColor: "gray",
      }}>
        <Drawer.Screen options={{title: "HOME"}} name="Home" component={Home}/>
        <Drawer.Screen options={{title: "MY ORDER", headerShown: true}} name="OrderTab" component={OrderTab}/>

        <Drawer.Screen options={{title: "PRODUCTS"}} name="ViewAll" component={ViewALl}/>
        <Drawer.Screen options={{title: "STORE LOCATION"}} name="StoreLocation" component={StoreLocation}/>

      </Drawer.Navigator>
    )
  }

  const AdminTab = () => {
    return(
      <Admin.Navigator screenOptions={{headerShown: false}}>
         <Admin.Screen name="Sell" component={Sell}/>
      </Admin.Navigator>
    )
  }

  return (
    <>
      <NavigationContainer>
        
        <Stack.Navigator screenOptions={{ headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="DrawerTab" component={DrawerTab} />
          <Stack.Screen name="User" component={User} />
          <Stack.Screen name="ViewItem" component={ViewItem} />
          <Stack.Screen name="OrderConfirmed" component={OrderConfirmed} />

          <Stack.Screen name="AdminTab" component={AdminTab} />
          <Stack.Screen options={{headerShown : true, title: "Order Details"}} name="Checkout" component={Checkout} />

          <Stack.Screen  options={{headerShown : true}} name="Search" component={Search} />
          <Stack.Screen options={{headerShown : true, title: "Shopping Cart"}} name="Cart" component={Cart} />

        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
