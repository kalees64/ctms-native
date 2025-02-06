import axios from "axios";
import { create } from "zustand";
import axiosHTTP from "../interceptors/axiosInterceptor";

interface REPORTSTORE {
  reports: any[];
  getAllReportsByProjectId: (projectId: string) => Promise<any>;
  getReportByReportId: (id: string) => Promise<any>;
  getReportSourceByReportId: (id: string) => Promise<any>;
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const reportStore = create<REPORTSTORE>((set) => ({
  reports: [],
  getAllReportsByProjectId: async (projectId: string) => {
    console.log(
      `--URL : ${apiUrl}/visits/getallvisitsbyprojectid/${projectId}`
    );
    try {
      const res = await axiosHTTP.get(
        `/visits/getallvisitsbyprojectid/${projectId}`
      );
      set((state) => ({ reports: [...res.data] }));
      console.log("--All Reports : ", res.data);
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
  getReportByReportId: async (id: string) => {
    try {
      const res = await axiosHTTP.get(`visits/getvisit/${id}`);
      console.log("--Report : ", res.data);
      return res.data[0];
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
  getReportSourceByReportId: async (id: string) => {
    try {
      const res = await axiosHTTP.get(
        `visits/getvisitresourcesdetailsbyid/${id}`
      );
      console.log("--Report Source: ", res.data);
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
