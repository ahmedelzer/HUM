import React, { useState } from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import COLORS from "../../context/colors";
import RenderInputField from "../RenderInputField";
import inputData from "../../context/Data.json";
import FormContainer from "../FormContainer";

const UserInfo = ({ navigation }) => {
  const data = inputData.UserInfo;
  const [info, setInfo] = useState({});
  const handleNext = () => {
    navigation.navigate("CompanyInfo", { id: "UserInfo" });
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

export { UserInfo };
