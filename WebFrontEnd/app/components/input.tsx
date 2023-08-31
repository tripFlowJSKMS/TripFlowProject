import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Input({ value, setValue, parameter, width }) {
  return (
    <View style={tw`mb-4 w-100%`}>
      <Text style={tw`text-base font-semibold mb-1`}>{parameter}:</Text>
      <View style={tw`flex-row items-center`}>
        <TextInput
          value={value}
          onChangeText={setValue}
          style={tw`w-100% h-10 border border-black rounded-lg p-2 focus:border-blue-500`}
        />
      </View>
    </View>
  );
}
