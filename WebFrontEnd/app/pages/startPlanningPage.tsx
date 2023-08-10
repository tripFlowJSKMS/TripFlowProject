import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import TopBar from '../components/topBar'
import { useState } from "react";

export default function StartPlanningPage() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [pace, setPace] = useState("");

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar /> 
      <View style={tw`flex items-center justify-center p-10`}>
        <Title parameter="Your next ideal trip"/>
        <View style={tw`flex-row justify-between p-3`}>
          <Input parameter="Departure" width={25} value={departure} setValue={setDeparture} />
          <View style={tw`w-20`}></View>
          <Input parameter="Destination" width={25} value={destination} setValue={setDestination} />
        </View>
        <Input parameter="Pace" width={15} value={pace} setValue={setPace} />
        <View style={tw`p-2`}></View>
        <Button>
          <Link href="/pages/pickLocationsPage">
            <Text style={tw.style("text-slate-900")}>Start planning!</Text>
          </Link>
        </Button>
      </View>
    </View>
  );
}