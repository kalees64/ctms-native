import React from "react";
import { ScrollView, Text, View } from "react-native";

const SideBarComponent = () => {
  return (
    <View className="absolute top-0 left-0 flex-1 w-9/12 h-screen bg-white p-4">
      <ScrollView></ScrollView>
    </View>
  );
};

export default SideBarComponent;
