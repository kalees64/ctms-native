import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { authStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import SelectComponent from "./ui/SelectComponent";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectRoleComponent = () => {
  const [user, setUser] = useState<any>(null);
  const [allUserRoles, setAllUserRoles] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleName, setSelectedRoleName] = useState("Select role");
  const [visible, setVisible] = useState(false);

  const { getUserFromLocalStorage, getUserRoles } = authStore();
  const router = useRouter();

  const toggleMenu = () => {
    setVisible(!visible);
  };
  const closeMenu = () => setVisible(false);

  const getAllRoles = (email: string) => {
    getUserRoles(email)
      .then((roles: any) => {
        console.log("Roles: ", roles);
        setAllUserRoles(roles);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  const handleSelectedRole = async () => {
    if (!selectedRole) {
      Alert.alert("Alert", "Please select the role");
      return;
    }

    console.log("--Selected role : ", selectedRole + " - " + selectedRoleName);

    const userDetails = allUserRoles.find(
      (user: any) => user.roleId === selectedRole
    );

    if (!userDetails) {
      Alert.alert("Alert", "Selected role is not found");
      return;
    }

    console.log("--Selected role User Details : ", userDetails);

    AsyncStorage.setItem("user", JSON.stringify(userDetails));

    router.push("/select-project");
  };

  useEffect(() => {
    // Get user from local storage
    getUserFromLocalStorage()
      .then((userData: any) => {
        const user = JSON.parse(userData);
        setUser(user);
        getAllRoles(user.email);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  }, []);
  return (
    <ImageBackground
      source={require("./../assets/images/bg-login.png")}
      className="flex-1 bg-fixed bg-cover"
    >
      <PaperProvider>
        <View className="flex-1 p-2">
          <View className="flex items-center justify-center pt-10">
            <Image
              style={{ width: 300, height: 100 }}
              source={require("./../assets/images/ctms-logo-2.png")}
            />
          </View>

          <View className="pt-3">
            <Text className="text-2xl font-bold text-center">
              Clinical Trial Management System
            </Text>
            <Text className="text-sm text-center pt-2">
              CTMS that optimizes financial, regulatory, and operational
              efficiency for research sites,site networks, hospitals, and health
              systems.
            </Text>
          </View>

          <View className="pt-16">
            <Text className="text-3xl font-bold text-center">Select Role</Text>
          </View>

          <View className="pt-3 px-4">
            {/* Select Role Component */}
            <View className="select w-full">
              <Pressable
                className="flex flex-row items-center justify-between"
                onPress={toggleMenu}
              >
                {/* Placeholder */}
                <Text className="text-gray-600">{selectedRoleName}</Text>
                <AntDesign name="caretdown" size={14} color="black" />
              </Pressable>
            </View>

            {/* Dropdown */}
            <View className=" max-h-40">
              {visible && (
                <ScrollView className="mt-3 bg-white">
                  {allUserRoles.map((role: any) => (
                    <View className="w-full p-1" key={role.roleId}>
                      <Text
                        className="hover:bg-blue-400 bg-gray-200 p-2"
                        onPress={() => {
                          setSelectedRole(role.roleId);
                          setSelectedRoleName(role.roleDescription);
                          closeMenu();
                        }}
                      >
                        {role.roleDescription}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>

          <View className="flex flex-row items-center justify-evenly pt-5 ">
            <Pressable
              className="w-5/12 p-3 rounded bg-blue-600"
              onPress={() => {
                router.back();
              }}
            >
              <Text className="text-center text-white font-semibold">
                Cancel
              </Text>
            </Pressable>
            <Pressable
              className="w-5/12 p-3 rounded bg-green-700"
              onPress={handleSelectedRole}
            >
              <Text className="text-center text-white font-semibold">
                Submit
              </Text>
            </Pressable>
          </View>

          <StatusBar style="auto" />
        </View>
      </PaperProvider>
    </ImageBackground>
  );
};

export default SelectRoleComponent;
