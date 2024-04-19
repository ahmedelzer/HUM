import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "./Button";

const ImageInput = ({ fieldName, setInfo, info }) => {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      // Convert image to base64
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1]; // Extract base64 string
        setBase64(base64String);
      };
      setInfo({
        ...info,
        [fieldName]: base64,
      });
    }
  };

  return (
    // <View style={styles.container}>
    //   {image && (
    //     <View onPress={() => pickImage()}>
    //       <Image source={{ uri: image }} style={styles.image} />
    //     </View>
    //   )}
    //   <Button title="Select Image" onPress={() => pickImage()} />
    // </View>
    <View style={styles.container} className=" m-auto" onTouchEnd={pickImage}>
      {/* <TouchableOpacity> */}
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <Image
          source={require("../../assets/favicon.png")}
          style={styles.image}
        />
      )}
      {/* </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    resizeMode: "cover",
  },
});

export default ImageInput;
