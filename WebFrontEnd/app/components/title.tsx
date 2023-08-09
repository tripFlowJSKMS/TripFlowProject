import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";

export default function Title({ parameter }) {
    return (
      <View style={tw`flex-row items-center justify-between mb-7`}>
        <Text style={tw`text-4xl font-medium`}>{parameter}</Text>
      </View>
    );
  }

