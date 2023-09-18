import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import { AreasOfInterestType } from "../../../Shared/types";

interface LocationComponentProps {
  name: string;
  characteristics: AreasOfInterestType[]
  onClick: () => void;
  isSelected: boolean;
}

  
export default function LocationComponent({ 
  name, characteristics, onClick, isSelected
}: LocationComponentProps) {
  return (
      <TouchableOpacity 
        style={[tw`flex rounded shadow-lg h-55 w-65 mr-5`, isSelected ? tw`border-blue-500 border-4` : {}]}
        onPress={onClick}
      >
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

