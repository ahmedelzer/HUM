import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Modal,
} from "react-native";

import COLORS from "../context/colors";

import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import DatePicker from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Constants from "expo-constants";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import { StatusBar } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ImageInput from "./InputComponents/ImageInput";
import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";
import Button from "./InputComponents/Button";
import ComboBox from "./InputComponents/ComboBox";
const RenderInputField = ({ input, info, setInfo }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [numberPrefix, setNumberPrefix] = useState("+91");
  const [address, setAddress] = useState();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    getPermissions();
  }, []);

  const handleDateChange = (event, selectedDate, fieldName) => {
    const currentDate = selectedDate || birthday;
    setShowDatePicker(Platform.OS === "ios");
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    setYear(year.toString());
    setMonth(month.toString().padStart(2, "0"));
    setDay(day.toString());
    setBirthday(currentDate);
    setInfo({
      ...info,
      [fieldName]: currentDate,
    });
  };

  const handleChange = (value, fieldName) => {
    setInfo({
      ...info,
      [fieldName]: value,
    });
  };

  return (
    <View key={input.title} style={{ marginBottom: 12 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 400,
          marginVertical: 8,
        }}
      >
        {input.title}
      </Text>
      {input.type === "text" || input.type === "email" ? (
        <TextInput
          placeholder={input.placeholder}
          onChangeText={(value) => handleChange(value, input.fieldName)}
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 8,
            height: 40,
            paddingLeft: 10,
          }}
        />
      ) : input.type === "date" ? (
        <>
          <View className="flex flex-row justify-between items-center">
            <TextInput
              placeholder="Year"
              placeholderTextColor="black"
              value={year} // Display selected date as string
              editable={false} // Make the text input read-only
              style={{
                borderWidth: 1,
                marginRight: 5,
                borderColor: "black",
                borderRadius: 8,
                height: 40,
                paddingLeft: 10,
                flex: 1,
              }}
            />
            <TextInput
              placeholder="Month"
              placeholderTextColor="black"
              value={month} // Display selected date as string
              editable={false} // Make the text input read-only
              style={{
                borderWidth: 1,
                borderColor: "black",
                marginRight: 5,
                borderRadius: 8,
                height: 40,
                paddingLeft: 10,
                flex: 1,
              }}
            />
            <TextInput
              placeholder="Day"
              placeholderTextColor="black"
              value={day} // Display selected date as string
              editable={false} // Make the text input read-only
              style={{
                borderWidth: 1,
                borderColor: "black",
                marginRight: 5,
                borderRadius: 8,
                height: 40,
                paddingLeft: 10,
                flex: 1,
              }}
            />
            {/* <Button
              title="Select"
              className="ml-2 h-4"
              onPress={() => setShowDatePicker(true)}
              
            /> */}
            <AntDesign
              onPress={() => setShowDatePicker(true)}
              style={{
                borderRadius: 8,
                height: 40,
                paddingLeft: 4,
                alignContent: "center",
                alignItems: "center",
                // flex: 1,
              }}
              name="calendar"
              size={28}
              color="black"
            />
          </View>

          {showDatePicker && (
            <RNDateTimePicker
              value={birthday}
              androidMode={"spinner"}
              display="spinner"
              onChange={(text, selectedDate) =>
                handleDateChange(text, selectedDate, input.fieldName)
              }
              dateFormat="day month year"
            />
          )}
        </>
      ) : input.type === "radio" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {input.options.map((option) => (
            <TouchableOpacity
              key={option.name}
              onPress={() => handleChange(option.value, input.fieldName)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <View
                style={{
                  height: 24,
                  width: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: COLORS.black,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {info[input.fieldName] === option.value && (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: COLORS.black,
                    }}
                  />
                )}
              </View>
              <Text style={{ marginLeft: 8 }}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : input.type === "tel" ? (
        <View>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="+91"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "12%",
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: "100%",
              }}
              onChangeText={(value) => setNumberPrefix(value)}
            />

            <TextInput
              placeholder="Enter your phone number"
              placeholderTextColor={COLORS.black}
              keyboardType="numeric"
              style={{
                width: "80%",
              }}
              onChangeText={(text) =>
                handleChange(numberPrefix + text, "phoneNumber")
              }
            />
          </View>
        </View>
      ) : input.type === "comboBox" ? (
        <ComboBox />
      ) : input.type === "password" ? (
        <View style={{ marginBottom: 12 }}>
          <View
            style={{
              width: "100%",
              height: 48,
              borderColor: COLORS.black,
              borderWidth: 1,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 22,
            }}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={COLORS.black}
              secureTextEntry={isPasswordShown}
              style={{
                width: "100%",
              }}
              onChangeText={(text) => handleChange(text, input.fieldName)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: "absolute",
                right: 12,
              }}
            >
              {isPasswordShown ? (
                <Ionicons name="eye-off" size={24} color={COLORS.black} />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.black} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : input.type === "upload" ? (
        // Render image upload input
        <ImageInput fieldName={input.fieldName} setInfo={setInfo} info={info} />
      ) : input.type === "location" ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text>Open Map</Text>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View
              style={styles.modalContainer}
              className=" top-0 flex-1 justify-center items-center  bg-[#fff]"
            >
              <MapView className="w-full h-full" region={region}>
                <Marker coordinate={region} title="Marker" />
              </MapView>
              <Button
                title="close map"
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              />
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
};

export default RenderInputField;
