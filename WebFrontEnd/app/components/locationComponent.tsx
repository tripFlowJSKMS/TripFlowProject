import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";


interface LocationComponentProps {
  name: string;
  characteristics: string[];
}

  
export default function LocationComponent({ 
  name, characteristics 
}: LocationComponentProps) {
  return (
      <TouchableOpacity style={tw`flex rounded shadow-lg h-55 w-65 mr-5`}>
        <ImageBackground imageStyle={{height:'70%'}} source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")} style={tw`w-full h-full rounded overflow-hidden`}>
          <View style={tw`flex h-[70%]`}>
            <Text style={tw`text-white pl-2 pb-1 absolute bottom-0 text-lg font-medium`}>{name}</Text>
          </View>
          {characteristics.map((characteristic) => (
            <Text style={tw`ml-2 mt-2`}>{characteristic}</Text>
          ))}
        </ImageBackground>
      </TouchableOpacity>
  );
}

