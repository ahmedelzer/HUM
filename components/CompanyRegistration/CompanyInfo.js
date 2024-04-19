import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import COLORS from "../../context/colors";
import RenderInputField from "../RenderInputField";
import Button from "../InputComponents/Button";
import inputData from "../../context/Data.json";
import FormContainer from "../FormContainer";

const CompanyInfo = ({ navigation }) => {
  const data = inputData.CompanyInfo;
  const [info, setInfo] = useState({});
  const handleNext = () => {
    navigation.navigate("CompanyAddress", { id: "CompanyInfo", location: "egypt" });
  };

  return (
    <FormContainer onNextPress={handleNext}>
    {data.map((input) => (
      <RenderInputField
        key={input.title}
        input={input}
        info={info}
        setInfo={setInfo}
      />
    ))}
  </FormContainer>
  );
};

export {  CompanyInfo };