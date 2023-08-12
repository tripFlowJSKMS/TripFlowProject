import { Link } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Title from "./title";

export default function DashBoard() {
    const [value, setValue] = useState("");
  
    return (
      <View>
      <ImageBackground source={require('../assets/sand-castle-on-clearwater-beach-photo.jpg')}>
        <Title parameter="Singapore" colour="text-white"></Title>
      </ImageBackground>
      </View>
    );
  }

