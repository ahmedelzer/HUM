import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
