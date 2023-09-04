import { Link } from "expo-router";
import { useState } from "react";
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function ItineraryComponent() {
    const [value, setValue] = useState("");
  
    return (
      <TouchableOpacity style={tw`flex rounded shadow-lg h-85 w-65 mr-5`}>
        <ImageBackground imageStyle={{height:'70%'}} source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")} style={tw`w-full h-full rounded overflow-hidden`}>
          
          <View style={tw`flex h-[70%]`}>
            <Text style={tw`text-white pl-2 pb-1 absolute bottom-0 text-lg font-medium`}>Cultural</Text>
          </View>

          <Text style={tw`h-[30%] px-3 py-1`}>
            Chinatown, Little India, Peranakan Museum, National Museum of Singapore
          </Text>

        </ImageBackground>

      </TouchableOpacity>
    );
  }

