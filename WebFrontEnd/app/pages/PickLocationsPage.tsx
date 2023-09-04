import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";

export default function PickLocationsPage() {
  return (
    <View style={tw`h-100%`}>
      <TopBar />

      <View style={tw`flex flex-col items-center w-100% h-20%`}>
        <DashBoard></DashBoard>
      </View>

      <View style={tw`h-20% flex ml-[10%] mt-[3%]`}>
        <Title size="2" parameter="Recommended Location List"/>
        <View style={tw`flex flex-row h-100%`}>
          <LocationComponent />
          <LocationComponent />
          <LocationComponent />
          <LocationComponent />
        </View>

        <Title size="2" parameter="Recommended Itineraries"/>
        <View style={tw`flex flex-row flex-wrap`}>
          <ItineraryComponent />
          <ItineraryComponent />
          <ItineraryComponent />
        </View>
      </View>

    </View>
  );
}