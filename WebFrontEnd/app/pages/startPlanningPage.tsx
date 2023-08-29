import React, { useState } from "react";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Title from "../components/Title";
import TopBar from '../components/TopBar'
import MonthYearPicker from "../components/startPlanningComponents/MonthYearPicker";
import TripTimingsPicker from "../components/startPlanningComponents/TripTimingsPicker";
import DepartureDestinationPicker from "../components/startPlanningComponents/DepartureDestinationPicker";
import CustomPicker from "../components/CustomPicker";
import PacePicker from "../components/startPlanningComponents/PacePicker";
import AreasOfInterestPicker from "../components/startPlanningComponents/AreasOfInterestPicker";

export default function StartPlanningPage() {

  const paxOptions: String[] = ["1", "2", "3-5", "6 or more"];
  const dietaryPreferences: String[] = ["Normal", "Vegetarian", "Halal"];

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar /> 

      <View style={tw`flex justify-center p-10`}>
        <Title parameter="Your ideal trip awaits"/>

        <View style={tw`w-[70%]`}>          
          <View style={tw`flex flex-row w-full`}>
            <View style={tw`flex flex-col`}>
              <MonthYearPicker></MonthYearPicker>
              <TripTimingsPicker></TripTimingsPicker>
            </View>
            <View style={tw`w-[10%]`}></View>
            <View style={tw`flex flex-col w-[30%]`}>
              <DepartureDestinationPicker></DepartureDestinationPicker>
              <View style={tw`flex flex-row w-full`}>
                <CustomPicker title="Pax" options={paxOptions} width="20%" fontSize="text-2x1"/>
                <View style={tw`w-20%`}></View>
                <CustomPicker title="Dietary Preference" options={dietaryPreferences} width="60%" fontSize="text-2x1"/>
              </View>
              <PacePicker></PacePicker>
            </View>
            <View style={tw`border-r border-gray-1000 h-150 ml-10 mr-10`} />
            <AreasOfInterestPicker></AreasOfInterestPicker>
          </View>
        </View>

        {/* <View style={tw`pt-[10%]`}>
          <Button onPress={() => startPlanning(departure, destination, pace)}>
            <Link href="/pages/PickLocationsPage">
              <Text style={tw.style("text-white")}>Start Planning</Text>
            </Link>
          </Button>
        </View> */}

      </View>

    </View>
  );
}

{/* <Input parameter="Departure" width={25} value={departure} setValue={setDeparture} /> */}
{/* <Input parameter="Destination" width={25} value={destination} setValue={setDestination} /> */}
