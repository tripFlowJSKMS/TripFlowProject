import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import LocationComponent from "../components/LocationComponent";
import ItineraryComponent from "../components/ItineraryComponent";

export default function HomePage() {
    return (
        <View style={tw`h-100%`}>
          <HomePageTopBar />
    
          <View style={tw`flex flex-col items-center w-100% h-20%`}>
            <HomePageDashboard></HomePageDashboard>
          </View>
    
          <View style={tw`h-20% flex ml-[10%] mt-[3%]`}>
            <Title size="2" parameter="Check out these itineraries"/>
            <View style={tw`flex flex-row flex-wrap`}>
              <ItineraryComponent />
              <ItineraryComponent />
              <ItineraryComponent />
            </View>
          </View>
    
        </View>
      );
}