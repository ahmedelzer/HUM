import React from "react";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import Header from "../components/AppComponents/Header";
import Footer from "../components/AppComponents/Footer";
import { StatusBar } from "expo-status-bar";
import Add from "../screens/Add";
import Rooms from "../screens/Rooms";
import Room from "../screens/Room";
import LoginWS from "../screens/LoginWS";
import Chatscreen from "../screens/Chatscreen";
import Messagescreen from "../screens/Messagescreen";

import GlobalState from "../context";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={Add} />
          <Stack.Screen name="Rooms" component={Rooms} />
          <Stack.Screen
            name="Room"
            options={{ headerShown: true }}
            component={Room}
          />
          <Stack.Screen
            name="Homescreen"
            component={LoginWS}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chatscreen"
            component={Chatscreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Messagescreen" component={Messagescreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" animated={true} hidden={true} />
    </GlobalState>
  );
}
