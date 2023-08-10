import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Input({ value, setValue, parameter, width }) {

  return (
    <View style={tw`flex-row items-center mb-4`}>
      <Text style={tw`text-base font-semibold w-${width}`}>{parameter}:</Text>
      <TextInput value={value} onChangeText={setValue} style={tw`w-70 h-10 border border-black rounded p-2 focus:border-blue-500`}/>
    </View>
  );
}

