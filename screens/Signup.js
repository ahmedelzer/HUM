import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Easing,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { createStackNavigator } from "@react-navigation/stack";
import APIHandling from "../components/hooks/APIsFunctions/APIHandling";
import inputData from "../context/Data.json"; // Assuming inputData.json is in the same directory
import { SafeAreaView, ScrollView, Image, Pressable } from "react-native";




import CompanyAddress from "../components/CompanyRegistration/CompanyAddress";
import { UserInfo } from "../components/CompanyRegistration/UserInfo";
import { CompanyInfo } from "../components/CompanyRegistration/CompanyInfo";
const Stack = createNativeStackNavigator();

const RegistrationScreen = ({ navigation }) => {


  return (
   <UserInfo navigation={navigation}  />
  );
};





const RegistrationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="RegistrationScreen">
      <Stack.Screen
        name="UserInfo"
        component={RegistrationScreen}
        options={{ title: "User Information" }}
      />
      <Stack.Screen
        name="CompanyInfo"
        component={CompanyInfo}
        options={{ title: "Company Information" }}
      />
      <Stack.Screen
        name="CompanyAddress"
        component={CompanyAddress}
        options={{ title: "Company Address" }}
      />

    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderRadius: 50,
    overflow: "hidden",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textInput: {
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginTop: 80,
    flexDirection: "row",
  },
});
export default RegistrationNavigator;

//location code
{
  /* <View className="flex-1 flex justify-center items-center bg-[#eee]">
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <Button title="Geocode Address" onPress={geocode} />
          <Button
            title="Reverse Geocode Current Location"
            onPress={reverseGeocode}
          />
          <StatusBar style="auto" />
        </View> */
}