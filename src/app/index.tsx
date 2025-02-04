import { useNavigation, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";

const Home = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Home</Text>

      <Button
        title="Login"
        onPress={() => {
          router.push("/login");
        }}
      />

      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
