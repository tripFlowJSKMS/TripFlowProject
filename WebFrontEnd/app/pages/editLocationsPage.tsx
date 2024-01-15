import React, { useState } from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { EditLocationsInputType } from "../../../Shared/types/pickLocations";
import { PickLocationsOutputType } from "../../../Shared/types/pickLocations";
import { RootState } from "@/lib/reducers/reducers";
import { useDispatch, useSelector } from "react-redux";
import { DestinationType } from "../../../Shared/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";
import { editLocations } from "@/api/editLocations";
import { setEditLocationsOutputDestinations } from "@/lib/reducers/editLocationsOutputDestinationReducer";
import { setItineraryInputDestinations } from "@/lib/reducers/itineraryInputDestinationReducer";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import { Pressable } from "react-native-gesture-handler";
import { setDestinationNotes } from "@/lib/reducers/destinationNotesReducer";

export default function EditLocationsPage() {
  const destinationsData: EditLocationsInputType = useSelector(
    (state: RootState) => state.editLocationsInputDestination.destinations,
  );
  const prevSelectedData: PickLocationsOutputType = useSelector(
    (state: RootState) => state.pickLocationsOutputDestination.destinations,
  );
  const [selectedDestinations, setSelectedDestinations] = useState<
    DestinationType[]
  >([]);
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToItineraryPage = () => {
    navigation.navigate("Itinerary");
  };

  const handleDestinationClick = (destination: DestinationType) => {
    setSelectedDestinations((prevDestinations: DestinationType[]) => {
      const isAlreadySelected = prevDestinations.some(
        (item) => item.id === destination.id,
      );
      if (isAlreadySelected) {
        return prevDestinations.filter((item) => item.id !== destination.id);
      } else {
        return [...prevDestinations, destination];
      }
    });
  };

  const handlePickDestinations = async () => {
    dispatch(setEditLocationsOutputDestinations(selectedDestinations));
    const allDestinations: DestinationType[] = [
      ...prevSelectedData,
      ...selectedDestinations,
    ];
    try {
      const finalItinerary = await editLocations(allDestinations);
      console.log(
        "INSPECTOR LOG: Generated Itinerary for user to be displated",
      );
      console.log(finalItinerary);
      dispatch(setItineraryInputDestinations(finalItinerary));
      dispatch(setDestinationNotes(finalItinerary));
      console.log("INSPECTOR LOG: Navigating to Itinerary Page");
      navigateToItineraryPage();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View>
      <TopBar />
      <View style={tw`flex flex-row justify-around`}>
        <DashBoard></DashBoard>
        <View>
          <Text style={tw`text-2xl font-bold my-5`}>
            Try these locations too!
          </Text>
          <View style={tw`flex flex-row flex-wrap`}>
            {destinationsData.map((destination) => (
              <LocationComponent
                key={destination.id}
                name={destination.name}
                characteristics={destination.characteristics}
                onClick={() => handleDestinationClick(destination)}
                isSelected={selectedDestinations.some(
                  (selected) => selected.id === destination.id,
                )}
              />
            ))}
          </View>
        </View>
        <View style={tw`w-2/12 justify-center h-3/6 items-center`}>
          <Pressable
            style={tw`bg-black rounded-3xl`}
            onPress={() => handlePickDestinations()}
          >
            <Text style={tw`text-white p-2 px-5`}>Confirm Selections</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
