import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import TopBar from "../components/topBar";
import DatePicker from "../components/startPlanningComponents/DatePicker";
import TripTimingsPicker from "../components/startPlanningComponents/TripTimingsPicker";
import DepartureDestinationPicker from "../components/startPlanningComponents/DepartureDestinationPicker";
import CustomPicker from "../components/customPicker";
import PacePicker from "../components/startPlanningComponents/PacePicker";
import AreasOfInterestPicker from "../components/startPlanningComponents/AreasOfInterestPicker";
import Button from "../components/button";
import { startPlanning } from "@/api/startPlanning";
import { useDispatch } from "react-redux";
import { setStartPlanningOutputDestinations } from "@/lib/reducers/startPlanningOutputDestinationReducer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";
import {
  AreasOfInterestType,
  DietaryPreferenceType,
  PaxNumberType,
  ScheduleType,
} from "../../../Shared/types";

function formatDate(year: number, month: number, date: number): string {
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = String(date).padStart(2, "0");
  const formattedDateStr = `${year}-${formattedMonth}-${formattedDate}`;
  return formattedDateStr;
}

export default function StartPlanningPage() {
  const paxOptions: PaxNumberType[] = ["1", "2", "3-5", "6 or more"];
  const dietaryPreferences: DietaryPreferenceType[] = ["Normal", "Vegetarian", "Halal", "Vegan"];

  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState(currentDate.getDay());
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [departureLocation, setDepartureLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [paxNumber, setPaxNumber] = useState<PaxNumberType>("1");
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreferenceType>("Normal");
  const [pace, setPace] = useState<ScheduleType>("Normal");
  const [areaOfInterests, setAreaOfInterests] = useState<Array<AreasOfInterestType>>([]);
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToPickLocationsPage = () => {
    navigation.navigate("PickLocations");
  };

  const handleStartPlanning = async () => {
    const destinations = await startPlanning({
      startDate: formatDate(selectedYear, selectedMonth, selectedDate),
      endDate: formatDate(selectedYear, selectedMonth, selectedDate),
      startTime,
      endTime,
      departureLocation,
      destinationLocation,
      paxNumber,
      dietaryPreference,
      pace,
      areasOfInterests: areaOfInterests,
    });
    // Dispatch the action to store the data in Redux
    dispatch(setStartPlanningOutputDestinations(destinations));
    navigateToPickLocationsPage();
  };

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar />
      <ScrollView contentContainerStyle={tw`flex justify-center p-10`}>
        <View style={tw`flex justify-center p-10`}>
          <Title parameter="Your ideal trip awaits" />

          <View style={tw`w-[70%]`}>
            <View style={tw`flex flex-row w-full`}>
              <View style={tw`flex flex-col w-[40%]`}>
                <DatePicker
                  onDateChange={(year, month, date) => {
                    setSelectedYear(year);
                    setSelectedMonth(month);
                    setSelectedDate(date);
                  }}
                />
                <TripTimingsPicker
                  selectedStartTime={startTime}
                  selectedEndTime={endTime}
                  onStartTimeChange={setStartTime}
                  onEndTimeChange={setEndTime}
                />
              </View>
              <View style={tw`w-[10%]`}></View>
              <View style={tw`flex flex-col w-[30%]`}>
                <DepartureDestinationPicker
                  onDepartureLocationChange={setDepartureLocation}
                  onDestinationLocationChange={setDestinationLocation}
                />
                <View style={tw`flex flex-row w-full`}>
                  <CustomPicker
                    title="Pax"
                    options={paxOptions}
                    width="20%"
                    fontSize="text-2x1"
                    selectedValue={paxNumber}
                    onValueChange={(value) =>
                      setPaxNumber(value as PaxNumberType)
                    }
                  />
                  <View style={tw`w-20%`}></View>
                  <CustomPicker
                    title="Dietary Preference"
                    options={dietaryPreferences}
                    width="60%"
                    fontSize="text-2x1"
                    selectedValue={dietaryPreference}
                    onValueChange={(value) =>
                      setDietaryPreference(value as DietaryPreferenceType)
                    }
                  />
                </View>
                <PacePicker
                  onPaceChange={(value: ScheduleType) =>
                    setPace(value)
                  }
                />
              </View>
              <View style={tw`border-r border-gray-100 h-150 ml-10 mr-10`} />
              <AreasOfInterestPicker
                onAreasOfInterestChange={(value: AreasOfInterestType[]) =>
                  setAreaOfInterests(value)
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* For MVP. Need to change enddate parameter for future production */}
      <View style={tw`absolute bottom-0 right-0 mb-[10%] mr-[5%]`}>
        <Button onPress={() => handleStartPlanning()}>
          <Text style={tw.style("text-white")}>Start Planning</Text>
        </Button>
      </View>
    </View>
  );
}
