import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { View, Text, ImageBackground } from "react-native";
import tw from "twrnc";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import useItineraryStore from "@/store/itineraryStore";
import useOnboardingStore from "@/store/onboardingStore";
import { GenerateDesirableDestinationsType } from "../../Shared/types/startPlanning";
import { startPlanning } from "@/api/startPlanning";
import RecommendedLocations from "@/components/itineraryPlanning/RecommendedLocations";
import RecommendedItineraries from "@/components/itineraryPlanning/RecommendedItineraries";
import { editLocations } from "@/api/editLocations";
import { DestinationType } from "../../Shared/types";

const placeholderImage = require("../assets/sand-castle-on-clearwater-beach-photo.jpg");

export default function ItineraryPlanning() {
  const [isLoading, setIsLoading] = useState(true);

  const spinAngle = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${spinAngle.value}deg`,
        },
      ],
    };
  }, [spinAngle.value]);

  const {
    startDate,
    endDate,
    startTime,
    endTime,
    departureLocation,
    destinationLocation,
    pax,
    dietaryPreference,
    pace,
    preferences,
  } = useOnboardingStore();

  const { destinations, setDestinations, itinerary, setItinerary } =
    useItineraryStore();

  useEffect(() => {
    // setIsLoading(false);
    spinAngle.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      200,
    );

    let paxNumber: "1" | "2" | "3-5" | "6 or more";
    if (pax === 1) {
      paxNumber = "1";
    } else if (pax === 2) {
      paxNumber = "2";
    } else if (pax >= 3 && pax <= 5) {
      paxNumber = "3-5";
    } else if (pax >= 6) {
      paxNumber = "6 or more";
    } else {
      throw new Error("Invalid pax number");
    }

    // Function to format date to YYYY-MM-DD as per backend requirements
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return `${year}-${month}-${day}`;
    };

    const onboardingDetails: GenerateDesirableDestinationsType = {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      startTime,
      endTime,
      departureLocation,
      destinationLocation,
      paxNumber,
      dietaryPreference,
      pace,
      areasOfInterests: preferences.map((preference) => preference.name),
    };

    const fetchDestinations = async () => {
      const destinationsAPIResponse = await startPlanning(onboardingDetails);

      setDestinations(destinationsAPIResponse);
    };

    const generateItinerary = async (destinations: DestinationType[]) => {
      const itineraryAPIResponse = await editLocations(destinations);

      console.log(itineraryAPIResponse);

      setItinerary(itineraryAPIResponse);
    };

    try {
      fetchDestinations().then(() =>
        generateItinerary(destinations).then(() => setIsLoading(false)),
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

    return () => cancelAnimation(spinAngle);
  }, []);

  if (!isLoading) {
    return (
      <View style={tw`mx-5 gap-10 flex h-full justify-start mt-24`}>
        <View>
          <ImageBackground
            source={placeholderImage}
            style={tw`w-full h-24 mb-2`}
            imageStyle={tw`rounded-xl`}
          />
          <Text style={tw`text-slate-800`}>
            Where modern marvels and timeless traditions harmoniously coexist.
            Be prepared to be captivated by its gleaming futurisitc architecture
            as you embark on your journey through this dynamic metropolis.
          </Text>
        </View>
        <RecommendedLocations destinations={destinations} />
        <RecommendedItineraries destinations={destinations} />
      </View>
    );
  }

  return (
    <View style={tw`flex items-center justify-center h-full w-full`}>
      <Animated.View style={animatedStyles}>
        <FontAwesome
          style={{
            transform: [{ rotate: `${spinAngle.value}deg` }],
          }}
          name="spinner"
          size={24}
          color="black"
        />
      </Animated.View>
    </View>
  );
}
