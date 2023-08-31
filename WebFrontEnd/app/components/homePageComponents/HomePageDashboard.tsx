import { Link } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Title from "../Title";

export default function HomePageDashboard() {
    return (
        <View style={tw`flex rounded shadow-lg h-100% w-80% bg-black`}>            
            <View style={tw`flex h-100% justify-center items-center px-5 py-2`}>
              <Title parameter="TripFlow" colour="text-white" size="5" />
              <Text style={tw`text-white w-50% text-lg font-medium text-center`}>Seamless Journey, Endless Joy</Text>
            </View>    
        </View>
      );
}