import { Text, View } from "react-native";
import tw from "twrnc";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import ItineraryComponent from "../components/itineraryComponent";
import FileUpload from "../components/homePageComponents/FileUpload";

export default function HomePage() {
    return (
        <View style={tw`flex items-center`}>
          <HomePageTopBar />
          <HomePageDashboard />
          <View style={tw`flex flex-row w-9/12 justify-between items-center`}>
            <View style={tw`w-9/12`}>
              <Text style={tw`text-xl font-bold mt-4 mb-4`}>Check Out These Itineraries</Text>
              <View style={tw`flex flex-row flex-wrap`}>
                <ItineraryComponent />
                <ItineraryComponent />
                <ItineraryComponent />
              </View>
            </View>
            <FileUpload/>
          </View>
        </View>
      );
}