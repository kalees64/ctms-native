// Native Components
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

// Styles
import "./../../global.css";

const index = () => {
  return (
    <View className="flex-1 ">
      <View>
        <Text className="text-2xl font-bold text-center">CTMS</Text>
        <Text className="text-2xl font-bold text-center">Login</Text>
      </View>

      <View>
        {/* <Image source={require("./../assets/images/CTMS.png")} /> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default index;
