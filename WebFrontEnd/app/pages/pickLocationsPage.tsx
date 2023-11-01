import { Text, View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/reducers";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";
import { useState } from "react";
import { DestinationType } from "../../../Shared/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";
import { setPickLocationsOutputDestinations } from "@/lib/reducers/pickLocationsOutputDestinationReducer";
import { setEditLocationsInputDestinations } from "@/lib/reducers/editLocationsInputDestinationReducer";
import { pickLocations } from "@/api/pickLocations";
import Button from "../components/button";

export default function PickLocationsPage() {

  const destinationsData: StartPlanningOutputType = useSelector((state: RootState) => state.startPlanningOutputDestination.destinations);
  const [selectedDestinations, setSelectedDestinations] = useState<DestinationType[]>([]);
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToEditLocationsPage = () => {
    navigation.navigate("EditLocations");
  };

  const handleDestinationClick = (destination: DestinationType) => {
    setSelectedDestinations((prevDestinations: DestinationType[]) => {
      const isAlreadySelected = prevDestinations.some(item => item.id === destination.id);
      if (isAlreadySelected) {
        return prevDestinations.filter((item) => item.id !== destination.id);
      } else {
        return [...prevDestinations, destination];
      }
    });
  }

  const handlePickDestinations = async () => {
    try {
      const destinations = await pickLocations(selectedDestinations);
      // Dispatch the action to store the data in Redux
      // What the user selected this page
      dispatch(setPickLocationsOutputDestinations(selectedDestinations));
      // What we are going to bump as neglected in the edit locations page 
      dispatch(setEditLocationsInputDestinations(destinations));
      navigateToEditLocationsPage();
    } catch (error) {
      console.error(error.message);
    }
  };

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
                  onClick={() => handleDestinationClick(destination)}
                  isSelected={selectedDestinations.some(selected => selected.id === destination.id)}
                />
              ))}
            </View>
            <View style={tw`flex flex-row-reverse mb-[10%] mr-[5%]`}>
              <Button onPress={() => handlePickDestinations()}>
                <Text style={tw.style("text-white")}>Confirm Selections</Text>
              </Button>
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