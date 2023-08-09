import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function ItineraryComponent() {
    const [value, setValue] = useState("");
  
    return (
      <TouchableOpacity onPress={() => {}} style={tw`w-50 h-30 m-4 mt-1 border-black rounded-lg bg-gray-300 flex items-center justify-center`} >
        {/* Replace with an image component */}
        {/* <Image source={yourImageSource} style={tw`w-6 h-6`} /> */}
      </TouchableOpacity>
    );
  }

