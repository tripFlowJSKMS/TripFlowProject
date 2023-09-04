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
    <View>
      <TopBar />

        <View style={tw`flex flex-row h-full`}>

          <View style={tw`flex w-[30%] p-10`}>
            <DashBoard></DashBoard>
          </View>
          
          <View style={tw`flex h-[100%] w-[70%] justify-center`}>
            <Title size="2" parameter="Recommended Locations"/>
            <View style={tw`flex flex-row flex-wrap`}>
              <LocationComponent />
              <LocationComponent />
              <LocationComponent />
              <LocationComponent />
            </View>

            <View style={tw`p-3`}></View>
            
            <Title size="2" parameter="Itineraries to check out!"/>
            <View style={tw`flex flex-row flex-wrap`}>
              <ItineraryComponent />
              <ItineraryComponent />
              <ItineraryComponent />
            </View>
          </View>
        </View>

    </View>
  );
}