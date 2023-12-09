import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";

interface CustomPickerProps<T> {
  title: string;
  options: T[];
  width: string;
  selectedValue: T;
  onValueChange: (itemValue: T) => void;
}

export default function CustomPicker<T extends string>({
  title,
  options,
  width,
  selectedValue,
  onValueChange,
}: CustomPickerProps<T>) {
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const [value, setValue] = useState(selectedValue);

  return (
    <View style={tw`w-${width}/12`}>
      <Text style={tw`text-sm font-semibold my-2`}>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
          onValueChange(itemValue);
        }}
        style={tw`w-full p-1 border rounded-lg`}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
