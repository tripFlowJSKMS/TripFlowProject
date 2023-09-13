import { Button, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import HomePageTopBar from '../components/homePageComponents/HomePageTopBar'
import HomePageDashboard from "../components/homePageComponents/HomePageDashboard";
import ItineraryComponent from "../components/itineraryComponent";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/types";

export default function HomePage() {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const navigateToStartPlanningPage = () => {
      navigation.navigate('StartPlanning'); // Make sure 'StartPlanning' matches the screen name in your navigation stack
    };

    return (
        <View style={tw`h-full`}>
          <HomePageTopBar navigation={navigateToStartPlanningPage}/>
    
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