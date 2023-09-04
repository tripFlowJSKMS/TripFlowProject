import { Link } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Title from "./title";

export default function DashBoard() {
  return (
    <TouchableOpacity style={tw`flex rounded shadow-lg h-100% w-80%`}>
      <ImageBackground source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")} style={tw`w-full h-full rounded shadow-lg overflow-hidden`}>
        
        <View style={tw`flex h-100% justify-center px-5 py-2`}>
          <Title parameter="Trip to Singapore" colour="text-white" size="3" />
          <Text style={tw`text-white w-50% text-md font-medium`}>Welcome to the enchanting city-state of Singapore, where modern marvels and timeless traditions harmoniously coexist. As you embark on your journey through this dynamic metropolis, be prepared to be captivated by its gleaming futuristic architecture.</Text>
        </View>

      </ImageBackground>
    </TouchableOpacity>
  );
}

