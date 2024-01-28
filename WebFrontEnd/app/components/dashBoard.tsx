import { ImageBackground, Text, Pressable, View } from "react-native";
import tw from "twrnc";

export default function DashBoard() {
  return (
    <Pressable style={tw`min-w-60 w-2/12 m-10 flex rounded shadow-lg`}>
      <ImageBackground
        source={require("../assets/sand-castle-on-clearwater-beach-photo.jpg")}
        style={tw`w-full h-full rounded shadow-lg`}
      >
        <View style={tw`bg-sky-500 bg-opacity-65 items-center p-3`}>
          <Text style={tw`text-white text-3xl font-bold mb-5`}>Singapore</Text>
          <Text style={tw`text-white text-base font-medium`}>
            Where modern marvels and timeless traditions harmoniously coexist.
            Be prepared to be capitvated by its gleaming futuristic architecture
            as you embark on your journey through this dynamic metropolis.
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
}
