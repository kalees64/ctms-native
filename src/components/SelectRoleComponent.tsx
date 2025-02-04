import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { authStore } from "../store/authStore";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectRoleComponent = () => {
  const router = useRouter();
  const { getTokenLocalStorage, getUserFromLocalStorage } = authStore();

  useEffect(() => {
    getTokenLocalStorage();
    getUserFromLocalStorage();
  }, []);
  return (
    <View className="flex-1 items-center justify-center">
      <Text>SelectRoleComponent</Text>

      <Button
        title="Login"
        onPress={() => {
          router.push("/login");
        }}
      />
      <View className="m-2"></View>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.clear();
          router.push("/");
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default SelectRoleComponent;
