import React, { useState } from "react";

import inputData from "../../context/Data.json";
import RenderInputField from "../RenderInputField";
import FormContainer from "../FormContainer";

const CompanyAddress = ({ navigation }) => {
  const data = inputData.CompanyAddress;
  const [info, setInfo] = useState({});

  const handleNext = () => {
    navigation.navigate("CompanyAddress", { id: "CompanyAddress", location: "egypt" });
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

export default CompanyAddress;
