import React, { useState } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";

export default function CustomPicker({ title, options, width, fontSize }) {
  // State to hold the selected value
  const [value, setValue] = useState("");

  return (
    <View style={tw`mt-5 w-[${width}]`}>
      <Text style={tw`${fontSize} font-bold mb-1`}>{title}</Text>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => setValue(itemValue)}
        style={tw`w-full border rounded-lg`}
      >
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
}