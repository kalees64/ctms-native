import "./../../global.css";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Pressable, Text, View } from "react-native";
import Input from "../components/ui/Input";
import { useState } from "react";
import { authStore } from "../store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const LoginComponent = () => {
  // Login Form State
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  // Hooks / Store
  const { login } = authStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email) {
      setErrors({ ...errors, email: true });
      return;
    }
    if (!password) {
      setErrors({ ...errors, password: true });
      return;
    }
    if (!email || !password) {
      setErrors({ email: true, password: true });
      return;
    }
    setErrors({ email: false, password: false });
    try {
      const res = await login({ username: email, password });
      console.log("--Login Response : ", res);

      AsyncStorage.setItem("appName", "CTMS");
      AsyncStorage.setItem("basicauth", res.token);
      AsyncStorage.setItem("user", JSON.stringify(res));

      router.push("/");

      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("--Error: ", error);
    }
  };
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
          <Text className="text-3xl font-bold text-center">Sign In</Text>
        </View>

        <View className="pt-3">
          <Input
            label="Email"
            placeholder="name@example.com"
            keyboardType="email-address"
            inputMode="email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: false });
            }}
            error={errors.email}
            errorText="Please enter a valid email"
          />
          <Input
            label="Password"
            placeholder="****"
            keyboardType="default"
            inputMode="text"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: false });
            }}
            secureTextEntry
            error={errors.password}
            errorText="Please enter a password"
          />
        </View>

        <View>
          <Pressable
            className="m-2 rounded bg-blue-500 p-3 "
            onPress={handleLogin}
          >
            <Text className="text-lg font-bold text-white text-center">
              Sign In
            </Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

export default LoginComponent;
