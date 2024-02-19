import { RootStackParamList } from "@/lib/navigation";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, Pressable, View } from "react-native";
import tw from "twrnc";
import ProfileButton from "./ProfileButton";
import TripFlowLogo from "./TripFlowLogo";

export default function HomePageTopBar() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={tw`flex flex-row items-center w-full justify-between pl-[2%] pr-[2%] mt-[1%]`}>
      <TripFlowLogo/>
      <View style={tw`flex flex-row`}>
        <Pressable onPress={() => navigation.navigate("StartPlanning")}>
          <Text style={tw`text-4xl font-semibold mx-5`}>+</Text>
        </Pressable>
        <ProfileButton/>
      </View>
     </View>
  );
}
