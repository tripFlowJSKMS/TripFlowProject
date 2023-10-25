import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface HomePageTopBarProps {
  navigation: () => void;
}

export default function HomePageTopBar({ navigation }: HomePageTopBarProps) {
  return (
    <View style={tw`flex-row items-center justify-between p-6 bg-transparent`}>
      <Text style={tw`text-lg font-semibold m-2`}>TripFlow</Text>
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity onPress={navigation}>
          <Text style={tw`text-5xl font-semibold mr-5 mb-3`}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center m-1`}
        >
          <Text style={tw`text-white text-lg font-semibold`}>S</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
