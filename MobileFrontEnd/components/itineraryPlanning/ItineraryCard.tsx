import type { DestinationType } from "../../../Shared/types";
import { Dimensions, ImageBackground, Text, View } from "react-native";
import tw from "twrnc";

const placeholderImage = require("../../assets/sand-castle-on-clearwater-beach-photo.jpg");

const { width } = Dimensions.get("window");

interface ItineraryCardProps {
  destination: DestinationType;
}

export default function ItineraryCard({ destination }: ItineraryCardProps) {
  return (
    <View
      style={tw.style(
        `h-40 flex border-2 border-slate-800 rounded-xl overflow-hidden`,
        {
          width: width - 40,
        },
      )}
    >
      <ImageBackground
        source={placeholderImage}
        style={tw`flex-1 w-full`}
        imageStyle={tw`rounded-t-xl`}
      >
        <Text
          style={tw`mt-auto mr-auto p-2 text-slate-200 text-base font-semibold`}
        >
          | {destination.name}
        </Text>
      </ImageBackground>
    </View>
  );
}
