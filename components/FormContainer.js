import React from "react";
import { View, PanResponder, ScrollView, SafeAreaView } from "react-native";
import COLORS from "../context/colors";
import NextButton from "./NextButton";

const FormContainer = ({ children, onNextPress }) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: () => {},
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        onNextPress(); // Trigger onNextPress function if swiped right
      }
      //else if (gestureState.dx < 50){onper}
    },
  });

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View
          style={{ flex: 1, marginHorizontal: 22 }}
          {...panResponder.panHandlers}
        >
          {children}
          <NextButton onPress={onNextPress} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default FormContainer;
