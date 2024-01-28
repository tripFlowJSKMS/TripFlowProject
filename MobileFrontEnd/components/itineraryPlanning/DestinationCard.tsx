import type { DestinationType } from "../../../Shared/types";
import { ImageBackground, Text, View } from "react-native";
import tw from "twrnc";

const placeholderImage = require("../../assets/sand-castle-on-clearwater-beach-photo.jpg");

interface DestinationCardProps {
  destination: DestinationType;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <View
      style={tw`h-40 w-48 flex border-2 border-slate-800 rounded-xl overflow-hidden`}
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
      <View style={tw`bg-slate-200 w-full justify-center p-2`}>
        <Text style={tw``}>
          {destination.characteristics
            .map((characteristic) => `#${characteristic.toLocaleLowerCase()}`)
            .join(" ")}
        </Text>
      </View>
    </View>
  );
}
