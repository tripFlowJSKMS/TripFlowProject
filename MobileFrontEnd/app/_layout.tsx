import { Slot } from "expo-router";
import { Dimensions, View } from "react-native";
import tw from "twrnc";

export default function HomeLayout() {
  return (
    <View style={tw.style(`max-w-md h-full`)}>
      <Slot />
    </View>
  );
}
