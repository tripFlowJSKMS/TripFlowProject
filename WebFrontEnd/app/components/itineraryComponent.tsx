import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function ItineraryComponent() {
    const [value, setValue] = useState("");
  
    return (
      <TouchableOpacity onPress={() => {}} style={tw`w-120 h-50 mb-3 mr-3 rounded bg-yellow-100 flex items-center justify-center`}>
      </TouchableOpacity>
    );
  }

