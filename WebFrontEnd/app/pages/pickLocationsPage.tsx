import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import TopBar from "../components/topBar";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";

export default function PickLocationsPage() {

  return (
    <View style={tw`flex flex-col h-full`}>
        <TopBar></TopBar>
        <View style={tw`flex justify-center p-10 pt-12`}>
            <Title parameter="Recommended Location List"/>
            <ScrollView horizontal contentContainerStyle={tw`flex justify-center items-center`}>
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
                <LocationComponent />
            </ScrollView>
            <Title parameter="Recommended Itineraries" />
            <ScrollView horizontal contentContainerStyle={tw`flex justify-center items-center`}>
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
            </ScrollView>
        </View>
    </View>
  );
}