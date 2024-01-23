import { Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/reducers/reducers";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";
import { useState } from "react";
import { DestinationType } from "../../../Shared/types";
import { setPickLocationsOutputDestinations } from "@/lib/reducers/pickLocationsOutputDestinationReducer";
import { setEditLocationsInputDestinations } from "@/lib/reducers/editLocationsInputDestinationReducer";
import { pickLocations } from "@/api/pickLocations";

export default function PickLocationsPage({ navigation }) {

  const destinationsData: StartPlanningOutputType = useSelector((state: RootState) => state.startPlanningOutputDestination.destinations);
  const [selectedDestinations, setSelectedDestinations] = useState<DestinationType[]>([]);
  const dispatch = useDispatch();

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
      <View style={tw`flex flex-row justify-around`}>
        <DashBoard></DashBoard>
        <View style={tw`my-5`}>
          <Text style={tw`text-2xl font-bold mb-3`}>Recommended Locations</Text>
          <View style={tw`flex flex-row flex-wrap`}>
            {/* {destinationsData.map((destination) => (
              <LocationComponent
                key={destination.id}
                name = {destination.name}
                characteristics = {destination.characteristics}
                onClick={() => handleDestinationClick(destination)}
                isSelected={selectedDestinations.some(selected => selected.id === destination.id)}
              />
            ))} */}
            {destinationsData.destinations.map((destination) => (
              <LocationComponent
                key={destination.id}
                name = {destination.name}
                characteristics = {destination.characteristics}
                onClick={() => handleDestinationClick(destination)}
                isSelected={selectedDestinations.some(selected => selected.id === destination.id)}
              />
            ))}
          </View>
          <Text style={tw`text-2xl font-bold my-5`}>Itineraries to check out!</Text>
          <View style={tw`flex flex-row flex-wrap`}>
            <ItineraryComponent />
            <ItineraryComponent />
            <ItineraryComponent />
          </View>
        </View>
        <View style={tw`w-2/12 justify-center h-3/6 items-center`}>
          <TouchableOpacity style={tw`bg-black rounded-3xl`} onPress={() => handlePickDestinations()}>
            <Text style={tw`text-white text-center p-2 px-5`}>Confirm Selections</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}