import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";

interface CustomPickerProps {
  title: string;
  options: string[];
  width: string;
  fontSize: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
}

export default function CustomPicker({
  title,
  options,
  width,
  fontSize,
  selectedValue,
  onValueChange,
}: CustomPickerProps) {
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const [value, setValue] = useState(selectedValue);

  return (
    <View style={tw`mt-5 w-[${width}]`}>
      <Text style={tw`${fontSize} font-bold mb-1`}>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => {
          setValue(itemValue);
          onValueChange(itemValue);
        }}
        style={tw`w-full border rounded-lg`}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}
