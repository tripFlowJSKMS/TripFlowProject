import { Text, View } from "react-native";
import tw from "twrnc";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import ItineraryComponent from "../components/itineraryComponent";

export default function HomePage() {
    return (
        <View style={tw`flex items-center`}>
          <HomePageTopBar />
          <HomePageDashboard />
          <View style={tw`w-9/12`}>
            <Text style={tw`w-50% text-xl font-bold w-full mt-4 mb-4`}>Check out these itineraries</Text>
            <View style={tw`flex flex-row flex-wrap`}>
              <ItineraryComponent />
              <ItineraryComponent />
              <ItineraryComponent />
            </View>
          </View>

        </View>
      );
}