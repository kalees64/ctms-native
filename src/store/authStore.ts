import { create } from "zustand";
import axiosHTTP from "../interceptors/axiosInterceptor";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AUTHSTORE {
  login: (data: any) => void;
  getUserFromLocalStorage: () => Promise<any>;
  getTokenLocalStorage: () => Promise<any>;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const authStore = create<AUTHSTORE>((set) => ({
  login: async (data: any) => {
    console.log("--Login Data : ", data);
    console.log(`${apiUrl}/auth/login`);

    try {
      const res = await axios.post(`${apiUrl}/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log("--Login Response : ", res.data);
      AsyncStorage.setItem("appName", "CTMS");
      AsyncStorage.setItem("basicauth", res.data.token);
      AsyncStorage.setItem("user", JSON.stringify(res.data));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("--Error: Axios Error--");
        console.log("Message:", error.message);
        console.log("Response Data:", error.response?.data);
        console.log("Status Code:", error.response?.status);
        console.log("Headers:", error.response?.headers);
      } else {
        console.log("--Error: Non-Axios Error--");
        console.log(error);
      }
    }
  },

  getUserFromLocalStorage: async () => {},

  getTokenLocalStorage: async () => {},
}));
