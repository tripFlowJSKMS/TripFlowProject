import { Text, View } from "react-native";
import tw from "twrnc";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import ItineraryComponent from "../components/itineraryComponent";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";

export default function HomePage() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const navigateToStartPlanningPage = () => {
      navigation.navigate('StartPlanning'); // Make sure 'StartPlanning' matches the screen name in your navigation stack
    };

    return (
        <View style={tw`flex items-center`}>
          <HomePageTopBar navigation={navigateToStartPlanningPage}/>

          <HomePageDashboard></HomePageDashboard>

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