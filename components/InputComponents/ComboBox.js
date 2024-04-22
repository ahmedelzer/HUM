import React, { useState, useEffect, useMemo, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight,
  TextInput,
} from "react-native";
import Reducer from "../Reducer";
import axios from "axios";
import { BuildApiUrl } from "../hooks/APIsFunctions/BuildApiUrl";
import UseFetch from "../hooks/APIsFunctions/UseFetch";
import { DataSourceAPI } from "../DataSourceAPI";
import COLORS from "../../context/colors";

const VIRTUAL_PAGE_SIZE = 3;
const MAX_ROWS = 50000;
const initialState = {
  rows: [],
  skip: 0,
  requestedSkip: 0,
  take: VIRTUAL_PAGE_SIZE * 2,
  totalCount: 0,
  loading: false,
  lastQuery: "",
};
const ComboBox = ({
  dashboardFormSchemaID,
  // displayField,
  open,
  setOpen,
  label,
  compoBoxTitle,
  // getField,
  // onSelect,
}) => {
  const {
    data: schemaActions,
    error,
    isLoading,
  } = UseFetch(
    `/api/Dashboard/GetDashboardSchemaActionsBySchemaID?DashboardSchemaID=${dashboardFormSchemaID}`,
    "Centralization"
  );
  const dataSourceAPI = (query, skip, take) =>
    BuildApiUrl(query, {
      pageIndex: skip / take + 1,
      pageSize: take,
    });
  // SetReoute(schema.projectProxyRoute);

  const getAction =
    schemaActions &&
    schemaActions.find(
      (action) => action.dashboardFormActionMethodType === "Get"
    );
  const createRowCache = (size) => {
    // Initialize an empty array to store the row cache
    const rowCache = [];

    // Generate rows and add them to the cache
    for (let i = 0; i < size; i++) {
      // Example: Each row is an object with an ID and data
      const row = {
        id: i,
        data: `Row ${i + 1}`,
      };
      rowCache.push(row);
    }

    // Return the populated row cache
    return rowCache;
  };
  const cache = useMemo(() => createRowCache(VIRTUAL_PAGE_SIZE));
  const [state, dispatch] = useReducer(Reducer, initialState);
  const updateRows = (skip, count, newTotalCount) => {
    dispatch({
      type: "UPDATE_ROWS",
      payload: {
        skip,
        rows: cache.getRows(skip, count),
        totalCount: newTotalCount < MAX_ROWS ? newTotalCount : MAX_ROWS,
      },
    });
  };
  const loadData = () => {
    const { requestedSkip, take, lastQuery, loading } = state;
    const query = dataSourceAPI(getAction, requestedSkip, take);
    console.log("dataSourceAPI", query);
    if (query !== lastQuery && !loading) {
      const cached = cache.getRows(requestedSkip, take);
      if (cached.length === take) {
        updateRows(requestedSkip, take);
      } else {
        dispatch({ type: "FETCH_INIT" });
        fetch(query)
          .then((response) => response.json())
          .then(({ dataSource, count }) => {
            cache.setRows(requestedSkip, dataSource);
            updateRows(requestedSkip, take, count);
          })
          .catch(() => dispatch({ type: "REQUEST_ERROR" }));
        // var response =  fetchDataWithHandling(query, 'GET');
        // response === 'REQUEST_ERROR'? (dispatch({ type: 'REQUEST_ERROR' })):
        // (
        //   cache.setRows(requestedSkip, response.dataSource);
        //     updateRows(requestedSkip, take, response.count);
        // )
      }
      dispatch({ type: "UPDATE_QUERY", payload: query });
    }
  };

  useEffect(() => loadData());
  // const { rows } = state;
  // // const [loading, setLoading] = useState(true);
  // // const [data, setData] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("Java");

  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

  return (
    <View>
      <View style={{ marginBottom: 12 }} onTouchEnd={() => setOpen(true)}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}
        >
          {label}
        </Text>

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
          {/* <TextInput
            editable={false}
            value={selectedValue}
            placeholder={`${label}`}
            placeholderTextColor={COLORS.black}
            keyboardType="email-address"
            style={{
              width: "100%",
            }}
          /> */}
        </View>
      </View>
      <View style={styles.container}>
        <Modal visible={open} animationType={"slide"} transparent={true}>
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
            <Text>{compoBoxTitle}</Text>
            {/* {rows.map((value, index) => {
              return (
                <TouchableHighlight
                  key={index}
                  onPress={() => setSelectedValue(value.value)}
                  style={{ paddingTop: 4, paddingBottom: 4 }}
                >
                  <Text>{value.label}</Text>
                </TouchableHighlight>
              );
            })} */}

            <TouchableHighlight
              onPress={console.log("done")}
              style={{ paddingTop: 4, paddingBottom: 4 }}
            >
              <Text onPress={() => setOpen(false)} style={{ color: "#999" }}>
                Cancel
              </Text>
            </TouchableHighlight>
          </View>
        </Modal>
        {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}
      </View>
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
