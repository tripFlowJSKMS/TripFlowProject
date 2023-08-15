import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import Button from "../components/button";
import TopBar from '../components/topBar'
import { useState } from "react";
import Input from "../components/input";
import { startPlanning } from "../lib/utils";
import PaceInput from "../components/paceInput";

export default function StartPlanningPage() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [pace, setPace] = useState("");

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar /> 

      <View style={tw`flex items-center justify-center p-10`}>
        <Title parameter="Plan Your Next Ideal Trip"/>

        <View style={tw`w-70%`}>
          <Text style={tw`text-base font-semibold`}>1. Choose places you will be visiting</Text>
          
          <View style={tw`flex flex-row w-40%`}>
            <Input parameter="Departure" width={25} value={departure} setValue={setDeparture} />
            <View style={tw`w-30%`}></View>
            <Input parameter="Destination" width={25} value={destination} setValue={setDestination} />
          </View>
          <View style={tw`flex w-40% flex-row`}>
            <PaceInput parameter="Pace" width={25} value={pace} setValue={setPace} />
          </View>
        </View>

        <View style={tw`pt-[10%]`}>
          <Button onPress={() => startPlanning(departure, destination, pace)}>
            <Link href="/pages/homePage">
              <Text style={tw.style("text-white")}>Start Planning</Text>
            </Link>
          </Button>
        </View>

      </View>

    </View>
  );
}