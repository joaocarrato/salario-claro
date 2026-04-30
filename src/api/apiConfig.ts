import Constants from "expo-constants";
import { Platform } from "react-native";
import axios from "axios";

function getApiBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;

  if (fromEnv) {
    return fromEnv;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:8080/api";
  }

  return "http://localhost:8080/api";
}

const apiBaseUrl = getApiBaseUrl();

if (__DEV__) {
  console.log("[API] Base URL:", apiBaseUrl, {
    platform: Platform.OS,
    expoHostUri: Constants.expoConfig?.hostUri,
  });
}

export const api = axios.create({
  baseURL: apiBaseUrl,
});
