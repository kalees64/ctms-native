import React from "react";
import AuthGuard from "../../guards/AuthGuard";
import { Slot, Stack } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import { View } from "react-native";

const DashboardLayout = () => {
  return (
    <AuthGuard>
      <HeaderComponent />
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
      <View className="flex-1 bg-[#f2deba] p-2">
        <Slot />
      </View>
    </AuthGuard>
  );
};

export default DashboardLayout;
