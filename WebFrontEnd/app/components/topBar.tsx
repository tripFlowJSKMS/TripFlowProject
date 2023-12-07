import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { Link } from "expo-router";

export default function TopBar() {
  return (
    <View style={tw`flex-row w-full items-center justify-between p-6 bg-black`}>
      <View style={tw`flex-row border-red-700`}>
        <Text style={tw`text-lg font-semibold mx-2 text-white`}>TripFlow</Text>
        <Link href="/pages/Page1">
          <Text style={tw`text-lg font-semibold mx-2 text-white`}>About Us</Text>
        </Link>
        <Link href="/pages/Page2">
          <Text style={tw`text-lg font-semibold mx-2 text-white`}>Surprise Me</Text>
        </Link>
        <Link href="/pages/Page3">
          <Text style={tw`text-lg font-semibold mx-2 text-white`}>Community</Text>
        </Link>
        <Link href="/pages/Page4">
          <Text style={tw`text-lg font-semibold mx-2 text-white`}>FAQ</Text>
        </Link>
      </View>

      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-4xl font-semibold mx-5`}>🏠</Text>
        <TouchableOpacity style={tw`w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center m-1`}>
          <Text style={tw`text-white text-lg font-semibold`}>S</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
