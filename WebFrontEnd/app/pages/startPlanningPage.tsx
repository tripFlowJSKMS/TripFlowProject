import React, { useState } from "react";
import { TouchableOpacity, Text, View } from "react-native";
import tw from "twrnc";
import TopBar from "../components/topBar";
import DatePicker from "../components/startPlanningComponents/DatePicker";
import TripTimingsPicker from "../components/startPlanningComponents/TripTimingsPicker";
import DepartureDestinationPicker from "../components/startPlanningComponents/DepartureDestinationPicker";
import CustomPicker from "../components/CustomPicker";
import PacePicker from "../components/startPlanningComponents/PacePicker";
import AreasOfInterestPicker from "../components/startPlanningComponents/AreasOfInterestPicker";
import { startPlanning } from "@/api/startPlanning";
import { useDispatch } from "react-redux";
import { setStartPlanningOutputDestinations } from "@/lib/reducers/startPlanningOutputDestinationReducer";
import formatDate from "../helpers/formatDate";
import {
  AreasOfInterestType,
  DietaryPreferenceType,
  PaxNumberType,
  ScheduleType,
} from "../../../Shared/types";
import { setTravellingPreferences } from "@/lib/reducers/travellingPreferencesReducer";

export default function StartPlanningPage({ navigation }) {
  const paxOptions: PaxNumberType[] = ["1", "2", "3-5", "6 or more"];
  const dietaryPreferences: DietaryPreferenceType[] = ["Normal", "Vegetarian", "Halal", "Vegan"];

  const currentDateCopy = new Date();
  const currentDate= formatDate(currentDateCopy.getFullYear(), currentDateCopy.getMonth(), currentDateCopy.getDate());
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);

  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [destinationLocation, setDestinationLocation] = useState<string>("");
  const [paxNumber, setPaxNumber] = useState<PaxNumberType>("1");
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreferenceType>("Normal");
  const [pace, setPace] = useState<ScheduleType>("Normal");
  const [areasOfInterests, setAreasOfInterests] = useState<Array<AreasOfInterestType>>([]);
  const dispatch = useDispatch();

  const handleStartPlanning = async () => {
    try {

      dispatch(setTravellingPreferences({startDate, endDate, startTime, endTime, departureLocation, destinationLocation, paxNumber, dietaryPreference, pace, areasOfInterests}));

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
        <View style={tw`md:w-full w-4/12`}>
          <Text style={tw`font-bold text-4xl`}>Your Ideal Trip Awaits</Text>
          <DatePicker currentDate={currentDate} startDate={startDate} endDate={endDate} setStartDate={setStartDate}
            setEndDate={setEndDate} />
          <TripTimingsPicker selectedStartTime={startTime} selectedEndTime={endTime} onStartTimeChange={setStartTime} onEndTimeChange={setEndTime} />
        </View>

        <View style={tw`w-3/12`}>
          <DepartureDestinationPicker
            onDepartureLocationChange={setDepartureLocation}
            onDestinationLocationChange={setDestinationLocation}
          />
          <View style={tw`flex flex-row justify-between`}>
            <CustomPicker<PaxNumberType> title="Pax" options={paxOptions} width="3" selectedValue={paxNumber} onValueChange={(value) => setPaxNumber(value)} />
            <CustomPicker title="Dietary Preference" options={dietaryPreferences} width="7"
              selectedValue={dietaryPreference} onValueChange={(value) => setDietaryPreference(value as DietaryPreferenceType)} />
          </View>
          <PacePicker onPaceChange={(value: ScheduleType) => setPace(value)} />
        </View>

        <View style={tw`flex w-2/12 items-center justify-evenly`}>
          <AreasOfInterestPicker onAreasOfInterestChange={(value: AreasOfInterestType[]) => setAreasOfInterests(value)} />
          <TouchableOpacity style={tw`bg-black rounded-2xl w-full p-2`} onPress={() => handleStartPlanning()}>
            <Text style={tw`text-white text-center`}>Start Planning</Text>
          </TouchableOpacity>
        </View>

      </View>
      {/* For MVP. Need to change enddate parameter for future production */}
    </View>
  );
}
