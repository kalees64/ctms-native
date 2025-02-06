import React from "react";
import AuthGuard from "../../guards/AuthGuard";
import { Slot, Stack } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";

const DashboardLayout = () => {
  return (
    <AuthGuard>
      <HeaderComponent />
      {/* <Stack screenOptions={{ headerShown: false }} /> */}
      <View className="flex-1 bg-[#f2deba] p-2">
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </View>
    </AuthGuard>
  );
};

export default DashboardLayout;
