import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./../../global.css";

const index = () => {
  return (
    <View className="flex-1 ">
      <View>
        <Text className="text-2xl font-bold text-center">CTMS</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default index;
