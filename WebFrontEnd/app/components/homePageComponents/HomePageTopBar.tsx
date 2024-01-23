import { RootStackParamList } from "@/lib/navigation";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Pressable, View } from "react-native";
import tw from "twrnc";

export default function HomePageTopBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex flex-row items-center w-full justify-between p-3`}>
      <Text style={tw`text-xl font-bold`}>TripFlow</Text>
      <View style={tw`flex flex-row`}>
        <Pressable onPress={() => navigation.navigate("StartPlanning")}>
          <Text style={tw`text-4xl font-semibold mx-5`}>+</Text>
        </Pressable>
        <Pressable
          style={tw`w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center m-1`}
        >
          <Text style={tw`text-white text-lg font-semibold`}>S</Text>
        </Pressable>
      </View>
    </View>
  );
}
