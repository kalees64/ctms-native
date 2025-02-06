import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import ReportViewComponent from "../../../components/ReportViewComponent";

const ReportViewPage = () => {
  const { reportId } = useLocalSearchParams();
  return <ReportViewComponent reportId={reportId} />;
};

export default ReportViewPage;
