import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Title from "../components/Title";
import Button from "../components/Button";
import TopBar from '../components/TopBar'
import { useState } from "react";
import Input from "../components/Input";
import { startPlanning } from "../lib/utils";
import ModalDropdown from 'react-native-modal-dropdown';
import PaceInput from "../components/PaceInput";
import DatePicker from 'react-native-modern-datepicker';
import MonthYearPicker from "../components/startPlanningComponents/MonthYearPicker";

export default function StartPlanningPage() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [pace, setPace] = useState("");

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar /> 

      <View style={tw`flex justify-center p-10`}>
        <Title parameter="Your ideal trip awaits"/>

        <View style={tw`w-70%`}>          
          <View style={tw`flex flex-row w-40% `}>
            <View style={tw`flex flex-col`}>
              <View style={tw`text-center w-100`}>Travel Dates</View>
              <View style={tw`w-full border-t border-gray-1000 my-2`} />
              <MonthYearPicker></MonthYearPicker>
              <View style={tw`text-center w-100 mt-4`}>Preferred Trip Timings</View>
              <View style={tw`w-full border-t border-gray-1000 my-2`} />
              <View>FIRST VIEW</View>
              <View>FIRST VIEW</View>
            </View>
            <View style={tw`w-30%`}></View>
            <View>SECOND VIEW</View>
            <View style={tw`border-r border-gray-1000 h-150 ml-10 mr-10`} />
            <View>THIRD VIEW</View>
          </View>
          <View style={tw`flex w-40% flex-row`}>
            <PaceInput parameter="Pace" width={25} value={pace} setValue={setPace} />
          </View>
        </View>

        <View style={tw`pt-[10%]`}>
          <Button onPress={() => startPlanning(departure, destination, pace)}>
            <Link href="/pages/PickLocationsPage">
              <Text style={tw.style("text-white")}>Start Planning</Text>
            </Link>
          </Button>
        </View>

      </View>

    </View>
  );
}

{/* <Input parameter="Departure" width={25} value={departure} setValue={setDeparture} /> */}
{/* <Input parameter="Destination" width={25} value={destination} setValue={setDestination} /> */}
