import React, { useEffect, useState } from "react";
import { Button, Image, Modal, Text, View } from "react-native";
import { universalStore } from "../store/universalStore";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const HeaderComponent = () => {
  const { headerName, fetchUniverseStore } = universalStore();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
    // AsyncStorage.clear();
    // router.push("/");
  };

  const logout = () => {
    setModalVisible(false);
    AsyncStorage.clear();
    router.push("/");
  };

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
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="white"
            onPress={handleLogout}
          />
        </View>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-10/12 p-5 bg-white rounded items-center">
            <Text className="text-lg font-semibold">
              Are you sure you want to logout?
            </Text>
            <View className="flex flex-row gap-4 pt-4">
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color={"blue"}
              />
              <Button title="Yes, Logout" onPress={logout} color={"red"} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HeaderComponent;
