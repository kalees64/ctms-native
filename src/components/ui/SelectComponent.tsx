import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SelectComponentProps {
  options: any[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  placeholder = "Select",
  options,
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };
  const closeMenu = () => setVisible(false);
  return (
    <View className="select w-full">
      <Pressable
        className="flex flex-row items-center justify-between"
        onPress={toggleMenu}
      >
        <Text className="text-gray-600">{placeholder}</Text>
        <AntDesign name="caretdown" size={14} color="black" />
      </Pressable>
      {visible && (
        <ScrollView className="mt-4 bg-white">
          {options.map((option: any) => (
            <View className="w-full m-1" key={option.roleId}>
              <Text
                className="hover:bg-blue-400 bg-gray-200 p-2"
                onPress={() => {
                  onSelect(option.roleId);
                  closeMenu();
                }}
              >
                {option.roleDescription}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default SelectComponent;
