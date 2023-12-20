import { ImageBackground, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function ItineraryComponent() {

    return (
      <TouchableOpacity style={tw`flex rounded shadow-lg h-75 w-65 mr-5 mb-20`}>
        <ImageBackground style={tw`h-full w-full justify-end rounded overflow-hidden`} source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")}>
          <Text style={tw`flex text-white text-lg font-medium p-2`}>Cultural</Text>
        </ImageBackground>

        <Text style={tw`p-2`}>
            Chinatown, Little India, Peranakan Museum, National Museum of Singapore
        </Text>
      </TouchableOpacity>
    );
  }

