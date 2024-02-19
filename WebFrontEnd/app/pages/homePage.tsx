import { View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import FileUpload from "../components/homePageComponents/FileUpload";
import ItineraryCard from "../components/itineraryCard";

export default function HomePage() {
    return (
        <View style={tw`flex-1 items-center`}>
          <HomePageTopBar />
          <View style={tw`w-[80%] mt-[3%]`}>
            <HomePageDashboard />
            <View>
              <Text variant="headlineLarge" style={tw`text-black font-bold pt-[3%]`} >Check Out These Itineraries</Text>
              <View style={tw`flex-row`}>
                <ItineraryCard title={"Cultural tour in Cambodia"} image_url={"https://picsum.photos/700"}/>
                <ItineraryCard title={"Food hunt in Shanghai"} image_url={"https://picsum.photos/701"}/>
                <ItineraryCard title={"Adventure trail in Spain"} image_url={"https://picsum.photos/702"}/>
              </View>
            </View>
            <View>
              <Text variant="headlineSmall" style={tw`text-black font-bold pt-[1%] pb-[2%]`} >If you have an existing itinerary, upload it here!</Text>
              <FileUpload/>
            </View>
          </View>
        </View>
      );
}