import axios from "axios";
// import { Axios } from "react-native-axios";

// import axios from "axios";
export const baseURL = "http://hum.ddnsking.com:8002/";
// export const websoketBaseURI = "ws://ihs.ddnsking.com:8002/Chanels";
// export const defaultProjectProxyRoute =
//   "http://ihs.ddnsking.com:8002/Centralization/Api";

export const request = axios.create({
  baseURL: baseURL,
  headers: {
    // languageName: lan,
  },
});
