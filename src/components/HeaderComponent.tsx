import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Yes, Logout" onPress={logout} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: { fontSize: 18, marginBottom: 15 },
  buttonContainer: { flexDirection: "row", gap: 10 },
});

export default HeaderComponent;
