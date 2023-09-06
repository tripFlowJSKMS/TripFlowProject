import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function Title({ parameter, colour = "", size = "4" }) {
  return (
    <View style={tw`mb-7`}>
      <Text style={tw`text-${size}xl ${colour} font-bold text-left`}>{parameter}</Text>
    </View>
  );
}
