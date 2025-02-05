import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import { universalStore } from "../store/universalStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const HeaderComponent = () => {
  const { headerName, fetchUniverseStore } = universalStore();

  useEffect(() => {
    fetchUniverseStore();
  }, []);
  return (
    <View className="w-full p-4  bg-[#83103e]">
      <View className="flex flex-row items-center justify-between gap-2">
        <Image
          source={require("./../assets/images/CTMS.png")}
          className="w-20 h-8 rounded"
        />
        <Text className="text-xl font-bold text-white">{headerName}</Text>
        <View className="flex flex-row gap-4 items-center">
          <FontAwesome6 name="bars-staggered" size={24} color="white" />
          <MaterialCommunityIcons name="logout" size={24} color="white" />
        </View>
      </View>
    </View>
  );
};

export default HeaderComponent;
