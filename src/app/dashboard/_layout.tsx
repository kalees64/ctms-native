import React, { useState } from "react";
import AuthGuard from "../../guards/AuthGuard";
import { Slot, Stack } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import { View } from "react-native";
import { PaperProvider } from "react-native-paper";
import SideBarComponent from "../../components/SideBarComponent";
import Toast from "react-native-toast-message";

const DashboardLayout = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <AuthGuard>
      <View className="flex-1 relative">
        <HeaderComponent
          menuVisible={menuVisible}
          setMenuVisible={setMenuVisible}
        />
        {/* <Stack screenOptions={{ headerShown: false }} /> */}
        <View className="flex-1 bg-[#f2deba] p-2">
          <Slot />
        </View>

        {/* Sidebar */}
        {menuVisible && <SideBarComponent />}

        {/* Toast Container */}
        <Toast />
      </View>
    </AuthGuard>
  );
};

export default DashboardLayout;
