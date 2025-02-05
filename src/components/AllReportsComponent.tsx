import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import HeaderComponent from "./HeaderComponent";
import { authStore } from "../store/authStore";
import Loader from "./ui/Loader";
import { reportStore } from "../store/reportsStore";
import AllReportsTable from "./tables/AllReportsTable";

const ALLReportsComponent = () => {
  const [user, setUser] = useState<any>(null);
  const [projectId, setProjectId] = useState<string>("");
  const [allReports, setAllReports] = useState<any[]>([]);
  let loading = false;

  const { getUserFromLocalStorage } = authStore();
  const { reports, getAllReportsByProjectId } = reportStore();
  const router = useRouter();

  const getProjectIdFromLocalStorage = async () => {
    const res = await AsyncStorage.getItem("projectId");
    if (res) {
      console.log("--ProjectId : ", res);
      setProjectId(res);
      getAllReports(res);

      return;
    }
    setProjectId("");
  };

  const getAllReports = async (projectId: string) => {
    const res = await getAllReportsByProjectId(projectId);
    console.log("--All Reports : ", res);
    loading = false;
  };

  const handleInit = async () => {
    loading = true;
    const userData = await getUserFromLocalStorage();
    setUser(JSON.parse(user));

    const projectId = await getProjectIdFromLocalStorage();

    console.log("--Current Path : ", router);

    // const reports = await getAllReports();
  };

  useEffect(() => {
    handleInit();
  }, []);

  if ((!user && !projectId) || !reports.length) {
    console.log("No More");
    return (
      <View className="flex-1  bg-[#f2deba]">
        {/* Header */}
        {/* <HeaderComponent /> */}
        <Loader />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View className="flex-1  bg-[#f2deba]">
      {/* Header */}
      {/* <HeaderComponent /> */}

      <ScrollView>
        <View className="flex-1 ">
          <Text className="font-bold text-2xl">All Reports</Text>
          <View className="pt-4">
            {reports && (
              <View>
                <AllReportsTable data={reports} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

export default ALLReportsComponent;
