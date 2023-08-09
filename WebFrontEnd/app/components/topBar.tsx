import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function TopBar() {
    const [value, setValue] = useState("");
  
    return (
      <View style={tw`flex-row items-center justify-between p-2 bg-gray-200`}>
        <Text style={tw`text-lg font-semibold m-2`}>TripFlow</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-lg font-semibold mr-5`}>+</Text>
          <TouchableOpacity style={tw`w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center m-1`}>
            <Text style={tw`text-white text-lg font-semibold`}>S</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

