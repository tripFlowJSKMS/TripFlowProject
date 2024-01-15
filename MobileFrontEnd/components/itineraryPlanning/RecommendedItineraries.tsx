import type { DestinationType } from "../../../Shared/types";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import ItineraryCard from "./ItineraryCard";

interface RecommendedItinerariesProps {
  destinations: DestinationType[];
}

export default function RecommendedItineraries({
  destinations,
}: RecommendedItinerariesProps) {
  return (
    <View style={tw`flex`}>
      <View style={tw`flex-row justify-between items-center mb-3`}>
        <Text style={tw`text-slate-800 text-lg font-semibold`}>
          Itineraries to check out!
        </Text>
        <Text style={tw`text-slate-600 font-medium text-base underline`}>
          More
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        persistentScrollbar
        style={tw`flex-grow-0`}
        contentContainerStyle={tw`mb-3`}
      >
        {destinations.map((destination) => {
          return (
            <ItineraryCard key={destination.name} destination={destination} />
          );
        })}
      </ScrollView>
    </View>
  );
}
