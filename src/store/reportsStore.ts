import axios from "axios";
import { create } from "zustand";
import axiosHTTP from "../interceptors/axiosInterceptor";

interface REPORTSTORE {
  reports: any[];
  getAllReportsByProjectId: (projectId: string) => Promise<any>;
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
        `${apiUrl}/visits/getallvisitsbyprojectid/${projectId}`
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
}));
