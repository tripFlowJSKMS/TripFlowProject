import { View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/reducers";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";
import { useState } from "react";
import { DestinationType } from "../../../Shared/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";

export default function PickLocationsPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  // Call this function weijie
  const navigateToEditLocationsPage = () => {
    navigation.navigate("EditLocations");
  };

  const destinationsData: StartPlanningOutputType = useSelector((state: RootState) => state.destination.destinations);
  const [selectedLocations, setSelectedLocations] = useState<DestinationType[]>([]);

  const handleLocationClick = (location: DestinationType) => {
    setSelectedLocations((prevLocations: DestinationType[]) => {
      const isAlreadySelected = prevLocations.some(item => item.id === location.id);
      if (isAlreadySelected) {
        return prevLocations.filter((item) => item.id !== location.id);
      } else {
        return [...prevLocations, location];
      }
    });
  }
  

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
            {destinationsData.map((destination) => (
              <LocationComponent
                key={destination.id}
                name = {destination.name}
                characteristics = {destination.characteristics}
                onClick={() => handleLocationClick(destination)}
                isSelected={selectedLocations.some(selected => selected.id === destination.id)}
              />
            ))}
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