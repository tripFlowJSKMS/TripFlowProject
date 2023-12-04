import { Link } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Title from "./Title";

export default function DashBoard() {
  return (
    <TouchableOpacity style={tw`h-full flex rounded shadow-lg`}>
      <ImageBackground
        source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")}
        style={tw`w-full h-full rounded shadow-lg overflow-hidden`}
      >
        <View style={tw`flex items-center px-5 py-2 bg-sky-500 bg-opacity-65`}>
          <Title parameter="Singapore" colour="text-white" size="3" />
          <Text style={tw`text-white w-[75%] text-base font-medium`}>
            Where modern marvels and timeless traditions harmoniously coexist.
            Be prepared to be capitvated by its gleaming futuristic architecture
            as you embark on your journey through this dynamic metropolis.
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
