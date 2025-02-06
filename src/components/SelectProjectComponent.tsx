import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { authStore } from "../store/authStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Select from "./ui/Select";

const SelectProjectComponent = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedProjectName, setSelectedProjectName] =
    useState("Select project");
  const [visible, setVisible] = useState(false);
  const [projectList, setProjectList] = useState<any[]>([]);

  const router = useRouter();
  const { getUserFromLocalStorage, getProjectsByUserIdRoleId } = authStore();

  const toggleMenu = () => {
    setVisible(!visible);
  };
  const closeMenu = () => setVisible(false);

  const getAllProjects = (userId: string, roleId: string) => {
    getProjectsByUserIdRoleId(userId, roleId)
      .then((projects: any) => {
        console.log("--All Projects : ", projects);
        setProjectList(projects);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
      });
  };

  const handleSelectedProject = async () => {
    if (!selectedProject) {
      Alert.alert("Alert", "Please select the project");
      return;
    }
    console.log(
      "--Selected Project : ",
      selectedProject + " - " + selectedProjectName
    );

    AsyncStorage.setItem("projectId", selectedProject);

    router.push("/dashboard");
  };

  useEffect(() => {
    // Get user from local storage
    getUserFromLocalStorage()
      .then((userData: any) => {
        const user = JSON.parse(userData);
        setUser(user);
        getAllProjects(user.userId, user.roleId);
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
          <Text className="text-3xl font-bold text-center">Select Project</Text>
        </View>

        <View className="pt-3">
          <Select
            options={projectList.map((project: any) => ({
              value: project._id,
              name: project.projectAcronym,
            }))}
            placeholder="Select Project"
            onSelect={(option: any) => {
              setSelectedProject(option.value);
              setSelectedProjectName(option.name);
            }}
          />
        </View>

        <View className="flex flex-row items-center justify-center pt-5 ">
          <Pressable
            className="w-6/12 p-3 rounded bg-pink-700"
            onPress={handleSelectedProject}
          >
            <Text className="text-center text-white font-semibold">Go</Text>
          </Pressable>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

export default SelectProjectComponent;
