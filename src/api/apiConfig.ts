import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

export const API_TIMEOUT_MS = 10000;

function getApiBaseUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;

  if (fromEnv) {
    return fromEnv;
  }

  if (Platform.OS === "android") {
    return "https://salario-claro-backend.onrender.com/api";
  }

  return "https://salario-claro-backend.onrender.com/api";
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
  timeout: API_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});
