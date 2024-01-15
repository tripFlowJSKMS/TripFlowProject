import type { DestinationType } from "../../../Shared/types";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import DestinationCard from "./DestinationCard";

interface RecommendedLocationsProps {
  destinations: DestinationType[];
}

export default function RecommendedLocations({
  destinations,
}: RecommendedLocationsProps) {
  return (
    <View style={tw`flex`}>
      <View style={tw`flex-row justify-between items-center mb-3`}>
        <Text style={tw`text-slate-800 text-lg font-semibold`}>
          Recommended Locations
        </Text>
        <Text style={tw`text-slate-600 font-medium text-base underline`}>
          More
        </Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        style={tw`flex-grow-0`}
        contentContainerStyle={tw`gap-4 mb-3`}
      >
        {destinations.map((destination) => {
          return (
            <DestinationCard key={destination.name} destination={destination} />
          );
        })}
      </ScrollView>
    </View>
  );
}
