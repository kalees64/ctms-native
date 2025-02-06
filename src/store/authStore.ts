import { create } from "zustand";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosHTTP from "../interceptors/axiosInterceptor";

interface AUTHSTORE {
  login: (data: any) => Promise<any>;
  getUserFromLocalStorage: () => Promise<any>;
  getTokenLocalStorage: () => Promise<any>;
  getUserRoles: (email: string) => Promise<any>;
  getProjectsByUserIdRoleId: (userId: string, roleId: string) => Promise<any>;
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
      // console.log("--Login Response : ", res.data);
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("--Error: Axios Error--");
        console.log("Message:", error.message);
        console.log("Status Code:", error.response?.status);
      } else {
        console.log("--Error: Non-Axios Error--");
        console.log(error);
      }
      if (error.response?.status == 404) {
        return "no user";
      }
      return null;
    }
  },

  getUserFromLocalStorage: async () => {
    const user = await AsyncStorage.getItem("user");
    console.log("--User from Local Storage : ", user);
    if (!user) {
      console.log("--User not found in Local Storage--");
      return null;
    }
    return user;
  },

  getTokenLocalStorage: async () => {
    const token = await AsyncStorage.getItem("basicauth");
    console.log("--Token from Local Storage : ", token);
    if (!token) {
      console.log("--Token not found in Local Storage--");
      return null;
    }
    return token;
  },
  getUserRoles: async (email: string) => {
    console.log("--Email : ", email);
    try {
      const res = await axiosHTTP.post(`/user-accounts/getuserroles`, {
        email: email,
      });
      console.log("--User Roles Response : ", res.data);
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("--Error: Axios Error--");
        console.log("Message:", error.message);
        console.log("Status Code:", error.response?.status);
      } else {
        console.log("--Error: Non-Axios Error--");
        console.log(error);
      }
      return null;
    }
  },
  getProjectsByUserIdRoleId: async (userId: string, roleId: string) => {
    try {
      const res = await axiosHTTP.get(
        `/projects/getuserprojects/${userId}/${roleId}`
      );
      console.log("--Projects List : ", res.data);
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("--Error: Axios Error--");
        console.log("Message:", error.message);
        console.log("Status Code:", error.response?.status);
      } else {
        console.log("--Error: Non-Axios Error--");
        console.log(error);
      }
      return null;
    }
  },
}));
