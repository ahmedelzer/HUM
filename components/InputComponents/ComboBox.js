import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight,
} from "react-native";
import axios from "axios";
import { BuildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import UseFetch from "../hooks/APIsFunctions/UseFetch";
import { DataSourceAPI } from "../DataSourceAPI";

const ComboBox = ({
  dashboardFormSchemaID,
  displayField,
  getField,
  onSelect,
}) => {
  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Java");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    console.log(value);
  };
  const { data, loading, error } = UseFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  console.log(data);
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  let d = [
    { label: "TypeScript", value: "JavaScript", key: 1, color: "green" },
    { label: "TypeScript", value: "TypeScript", key: 2, color: "green" },
    { label: "Python", value: "Python", key: 3, color: "green" },
    { label: "Java", value: "Java", key: 4, color: "green" },
  ];
  return (
    <View style={styles.container}>
      <Modal visible={true} animationType={"slide"} transparent={true}>
        <View
          style={{
            margin: 20,
            padding: 20,
            backgroundColor: "#efefef",
            bottom: 20,
            left: 20,
            right: 20,
            alignItems: "center",
            position: "absolute",
          }}
        >
          <Text>Please pick a value</Text>
          {d.map((value, index) => {
            return (
              <TouchableHighlight
                key={index}
                onPress={() => setSelectedValue(value.value)}
                style={{ paddingTop: 4, paddingBottom: 4 }}
              >
                <Text>{value.label}</Text>
              </TouchableHighlight>
            );
          })}

          <TouchableHighlight
            onPress={console.log("done")}
            style={{ paddingTop: 4, paddingBottom: 4 }}
          >
            <Text style={{ color: "#999" }}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}
    </View>
  );
};

// ComboBox.propTypes = {
//   displayField: PropTypes.string.isRequired,
//   onSelect: PropTypes.func.isRequired,
//   apiUrl: PropTypes.string.isRequired,
//   placeholder: PropTypes.string,
// };
const customPickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: "#fff",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     marginVertical: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ComboBox;
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const url = `http://localhost:8002/Centralization/api/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${dashboardFormSchemaID}`;
//       console.log("url", url);
//       const response = await axios.get(url);

//       const schemaActions = response.data;
//       const action = schemaActions.find(
//         (action) => action.dashboardFormActionMethodType === "Get"
//       );
//       setGetAction(action); // Set getAction state
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching schema actions:", error);
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, [dashboardFormSchemaID]);
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(DataSourceAPI(getAction));
//       setData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, [getAction]);
