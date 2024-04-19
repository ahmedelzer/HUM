import React from "react";
import { View, PanResponder } from "react-native";
import Button from "./InputComponents/Button";

const NextButton = ({ onPress }) => {


  return (
      <Button
        title="Next"
        filled
        onPress={onPress}
        style={{
          marginTop: 18,
          marginBottom: 4,
        }}
      />
  );
};

export default NextButton;
