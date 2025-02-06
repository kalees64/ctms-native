import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { authStore } from "../store/authStore";
import { reportStore } from "../store/reportsStore";
import Loader from "./ui/Loader";
import { format } from "date-fns";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const ReportViewComponent = ({ reportId }: { reportId: any }) => {
  const [user, setUser] = useState<any>();
  const [report, setReport] = useState<any>();
  const [reportSource, setReportSource] = useState<any>();

  const router = useRouter();
  const { getUserFromLocalStorage } = authStore();
  const { getReportByReportId, getReportSourceByReportId } = reportStore();

  const handleInit = async () => {
    const userData = await getUserFromLocalStorage();
    setUser(JSON.parse(userData));

    const reportData = await getReportByReportId(String(reportId));
    setReport(reportData);

    const reportSourceData = await getReportSourceByReportId(String(reportId));
    setReportSource(reportSourceData);
  };

  useEffect(() => {
    handleInit();
  }, []);

  if (!user || !report || !reportSource) {
    return (
      <View className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-2xl">Report View </Text>
          <MaterialCommunityIcons
            name="backburger"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>
        <View className="mt-2 border border-black/50"></View>
        <Loader />
        <StatusBar style="light" backgroundColor="#83103e" />
      </View>
    );
  }
  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold text-2xl">Report View </Text>
          <MaterialCommunityIcons
            name="backburger"
            size={24}
            color="black"
            onPress={() => {
              router.back();
            }}
          />
        </View>
        <View className="mt-2 border border-black/50"></View>

        {/* Summary */}
        <View className="flex-1 pt-2">
          <Text className="font-bold text-xl">Summary</Text>

          <View className="flex-1 flex flex-row gap-2 py-2 px-1 flex-wrap">
            <View className="w-full flex flex-row items-center gap-1 ">
              <Text className="font-semibold w-5/12">Visit No : </Text>
              <Text>{report.visitNo ? report.visitNo : ""}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Site Name : </Text>
              <Text>{report.site ? report.site : ""}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Study Acronym :</Text>
              <Text>
                {reportSource.projectDetails.projectAcronym
                  ? reportSource.projectDetails.projectAcronym
                  : ""}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12"> PI Name :</Text>
              <Text>
                {reportSource.piDetails[0].firstName
                  ? reportSource.piDetails[0].firstName
                  : ""}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Study Name :</Text>
              <Text>{report.projectName ? report.projectName : ""}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">CRA Name : </Text>
              <Text>{report.craName ? report.craName : ""}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Reviewer Name :</Text>
              <Text>{report.reviewerName ? report.reviewerName : ""}</Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Submit Due Date :</Text>
              <Text>
                {report.submitDueDate
                  ? format(report.submitDueDate, "dd MMM yyyy hh:mm a")
                  : ""}
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-1">
              <Text className="font-semibold w-5/12">Finalized Due Date :</Text>
              <Text>
                {report.finalizationDueDate
                  ? format(report.finalizationDueDate, "dd MMM yyyy hh:mm a")
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar style="light" backgroundColor="#83103e" />
    </View>
  );
};

export default ReportViewComponent;
