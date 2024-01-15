import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import tw from "twrnc";
import TopBar from "../components/topBar";
import DatePicker from "../components/startPlanningComponents/DatePicker";
import TripTimingsPicker from "../components/startPlanningComponents/TripTimingsPicker";
import DepartureDestinationPicker from "../components/startPlanningComponents/DepartureDestinationPicker";
import PacePicker from "../components/startPlanningComponents/PacePicker";
import AreasOfInterestPicker from "../components/startPlanningComponents/AreasOfInterestPicker";
import { startPlanning } from "@/api/startPlanning";
import { useDispatch } from "react-redux";
import { setStartPlanningOutputDestinations } from "@/lib/reducers/startPlanningOutputDestinationReducer";
import { formatDate } from "../helpers/dateTimeHelpers/dateTimeFunctions";
import {
  AreasOfInterestType,
  DietaryPreferenceType,
  PaxNumberType,
  ScheduleType,
} from "../../../Shared/types";
import { setTravellingPreferences } from "@/lib/reducers/travellingPreferencesReducer";
import PaxPicker from "../components/startPlanningComponents/PaxPicker";
import DietaryPreferencePicker from "../components/startPlanningComponents/DietaryPreferencePicker";

export default function StartPlanningPage({ navigation }) {
  const currentDateCopy = new Date();
  const currentDate = formatDate(
    currentDateCopy.getFullYear(),
    currentDateCopy.getMonth(),
    currentDateCopy.getDate(),
  );
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [paxNumber, setPaxNumber] = useState<PaxNumberType>("1");
  const [dietaryPreference, setDietaryPreference] =
    useState<DietaryPreferenceType>("Normal");
  const [pace, setPace] = useState<ScheduleType>("Normal");
  const [areasOfInterests, setAreasOfInterests] = useState<
    AreasOfInterestType[]
  >([]);
  const dispatch = useDispatch();

  const handleStartPlanning = async () => {
    try {
      dispatch(
        setTravellingPreferences({
          startDate,
          endDate,
          startTime,
          endTime,
          departureLocation,
          destinationLocation,
          paxNumber,
          dietaryPreference,
          pace,
          areasOfInterests,
        }),
      );

      const destinations = await startPlanning({
        startDate,
        endDate,
        startTime,
        endTime,
        departureLocation,
        destinationLocation,
        paxNumber,
        dietaryPreference,
        pace,
        areasOfInterests,
      });
      // Dispatch the action to store the data in Redux
      dispatch(setStartPlanningOutputDestinations(destinations));
      navigation.navigate("PickLocations");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={tw`flex items-center`}>
      <TopBar />
      <View style={tw`flex flex-row justify-between w-9/12 m-15`}>
        <View style={tw`w-4/12`}>
          <Text style={tw`font-bold text-4xl`}>Your Ideal Trip Awaits</Text>
          <DatePicker
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <TripTimingsPicker
            selectedStartTime={startTime}
            selectedEndTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        </View>

        <View style={tw`w-3/12`}>
          <DepartureDestinationPicker
            departureQuery={departureLocation}
            destinationQuery={destinationLocation}
            onDepartureLocationChange={setDepartureLocation}
            onDestinationLocationChange={setDestinationLocation}
          />
          <View style={tw`flex flex-wrap flex-row justify-between`}>
            <PaxPicker setPaxNumber={setPaxNumber} />
            <DietaryPreferencePicker
              setDietaryPreference={setDietaryPreference}
            />
          </View>
          <PacePicker pace={pace} setPace={setPace} />
        </View>

        <View style={tw`flex w-2/12 items-center justify-evenly`}>
          <AreasOfInterestPicker
            onAreasOfInterestChange={(value: AreasOfInterestType[]) =>
              setAreasOfInterests(value)
            }
          />
          <Pressable
            style={tw`bg-black rounded-2xl w-full p-2`}
            onPress={() => handleStartPlanning()}
          >
            <Text style={tw`text-white text-center`}>Start Planning</Text>
          </Pressable>
        </View>
      </View>
      {/* For MVP. Need to change enddate parameter for future production */}
    </View>
  );
}
