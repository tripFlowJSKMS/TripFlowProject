import { RootStackParamList } from "@/lib/navigation";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

export default function HomePageTopBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex flex-row items-center w-full justify-between p-3`}>
      <Text style={tw`text-xl font-bold m-2`}>TripFlow</Text>
      <View style={tw`flex flex-row`}>
        <TouchableOpacity onPress={() => navigation.navigate('StartPlanning')}>
          <Text style={tw`text-4xl font-semibold mx-5`}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center m-1`}>
          <Text style={tw`text-white text-lg font-semibold`}>S</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
