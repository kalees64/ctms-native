import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SelectProps {
  options: OPTION[];
  placeholder?: string;
  onSelect: (value: OPTION) => void;
  patchValue?: OPTION;
}

interface OPTION {
  value: number | string;
  name: string | number;
}

const Select: React.FC<SelectProps> = ({
  placeholder = "Select",
  options,
  onSelect,
  patchValue,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number | string>();
  const [selectedValueName, setSelectedValueName] = useState<number | string>();

  const toggleMenu = () => {
    setVisible(!visible);
  };
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (patchValue) {
      setSelectedValue(patchValue.value);
      setSelectedValueName(String(patchValue.name));
      onSelect(patchValue);
    }
  }, []);
  return (
    // <View className="select w-full">
    //   <Pressable
    //     className="flex flex-row items-center justify-between"
    //     onPress={toggleMenu}
    //   >
    //     <Text className="text-gray-600">{placeholder}</Text>
    //     <AntDesign name="caretdown" size={14} color="black" />
    //   </Pressable>
    //   {visible && (
    //     <ScrollView className="mt-4 bg-white">
    //       {options.map((option: any) => (
    //         <View className="w-full m-1" key={option.roleId}>
    //           <Text
    //             className="hover:bg-blue-400 bg-gray-200 p-2"
    //             onPress={() => {
    //               onSelect(option.roleId);
    //               closeMenu();
    //             }}
    //           >
    //             {option.roleDescription}
    //           </Text>
    //         </View>
    //       ))}
    //     </ScrollView>
    //   )}
    // </View>

    <View className="px-4">
      {/* Select Role Component */}
      <View className="select w-full">
        <Pressable
          className="flex flex-row items-center justify-between"
          onPress={toggleMenu}
        >
          {/* Placeholder */}
          <Text className="text-gray-600" id={String(selectedValue)}>
            {selectedValueName ? selectedValueName : placeholder}
          </Text>
          <AntDesign name="caretdown" size={14} color="black" />
        </Pressable>
      </View>

      {/* Dropdown */}
      <View className=" max-h-40">
        {visible && (
          <ScrollView className="mt-3 bg-white">
            {options.length > 0 ? (
              options.map((option: OPTION, index: number) => (
                <View className="w-full p-1" key={index}>
                  <Text
                    className="hover:bg-blue-400 bg-gray-200 p-2"
                    onPress={() => {
                      setSelectedValue(option.value);
                      setSelectedValueName(String(option.name));
                      onSelect(option);
                      closeMenu();
                    }}
                  >
                    {String(option.name)}
                  </Text>
                </View>
              ))
            ) : (
              <View className="w-full p-1">
                <Text
                  className="hover:bg-blue-400 bg-gray-200 p-2"
                  onPress={() => {
                    closeMenu();
                  }}
                >
                  None
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Select;
