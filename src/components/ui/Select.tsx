import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { Button, Menu, TextInput } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";

interface SelectProps {
  options: string[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select",
  onSelect,
}) => {
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const openMenu = () => {
    setVisible(true);
    Keyboard.dismiss();
  };
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{ width: "100%" }}
        anchor={
          <TextInput
            placeholder={placeholder}
            value={selectedValue}
            onFocus={openMenu}
            right={<TextInput.Icon icon="menu-down" onPress={openMenu} />}
          />
        }
      >
        {options.map((option) => (
          <Menu.Item
            key={option}
            onPress={() => {
              setSelectedValue(option);
              onSelect(option);
              closeMenu();
            }}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
};

export default Select;
