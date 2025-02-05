import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const ReportViewPage = () => {
  const { reportId } = useLocalSearchParams();
  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <Text className="font-bold text-2xl">Report View</Text>
      </ScrollView>
    </View>
  );
};

export default ReportViewPage;
