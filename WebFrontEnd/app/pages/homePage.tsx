import { View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import ItineraryComponent from "../components/itineraryComponent";

export default function HomePage() {
    return (
        <View style={tw`h-full`}>
          <HomePageTopBar />
    
          <View style={tw`flex flex-col items-center w-full h-[20%]`}>
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