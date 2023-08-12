import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Title({ parameter, colour="", size="4" }) {
    return (
      <View style={tw`flex-row items-center justify-between mb-7`}>
        <Text style={tw`text-${size}xl ${colour} font-bold`}>{parameter}</Text>
      </View>
    );
  }

