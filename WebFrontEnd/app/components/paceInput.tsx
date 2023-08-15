import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";

export default function PaceInput({ value, setValue, parameter, width }) {
  // Create an array of pace options
  const paceOptions = ["Relaxed", "Normal", "Packed"];

  return (
    <View style={tw`mb-4 w-${width}`}>
      <Text style={tw`text-base font-semibold mb-1`}>{parameter}:</Text>
      <View style={tw`flex-row items-center`}>
        <Picker selectedValue={value} onValueChange={(itemValue) => setValue(itemValue)} style={tw`w-100% h-10 border border-black rounded-lg p-2`} >
          <Picker.Item label="" value="" />
          {paceOptions.map((pace, index) => (
            <Picker.Item key={index} label={pace} value={pace} />
          ))}
        </Picker>
      </View>
    </View>
  );
}