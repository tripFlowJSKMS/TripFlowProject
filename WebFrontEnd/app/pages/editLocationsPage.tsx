import React, { useState } from 'react'
import { View, Text } from 'react-native'
import tw from "twrnc";
import { EditLocationsInputType } from "../../../Shared/types/pickLocations";
import { PickLocationsOutputType } from '../../../Shared/types/pickLocations';
import { RootState } from '@/lib/reducers/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { DestinationType } from '../../../Shared/types';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/lib/navigation";
import { editLocations } from '@/api/editLocations';
import { setEditLocationsOutputDestinations } from '@/lib/reducers/editLocationsOutputDestinationReducer';
import { setItineraryInputDestinations } from '@/lib/reducers/itineraryInputDestinationReducer';
import TopBar from '../components/topBar';
import DashBoard from '../components/dashBoard';
import Title from '../components/title';
import Button from '../components/button';
import LocationComponent from '../components/locationComponent';

export default function EditLocationsPage() {

  const destinationsData: EditLocationsInputType = useSelector((state: RootState) => state.editLocationsInputDestination.destinations);
  const prevSelectedData: PickLocationsOutputType = useSelector((state: RootState) => state.pickLocationsOutputDestination.destinations ); 
  const [selectedDestinations, setSelectedDestinations] = useState<DestinationType[]>([]);
  const dispatch = useDispatch();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const navigateToItineraryPage = () => {
    navigation.navigate("Itinerary");
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
    dispatch(setEditLocationsOutputDestinations(selectedDestinations));
    const allDestinations: DestinationType[] = [...prevSelectedData, ...selectedDestinations];
    try {
      console.log("INSPECTOR LOG: User's final selection of destinations");
      console.log(allDestinations);
      const finalItinerary = await editLocations(allDestinations);
      console.log("INSPECTOR LOG: Generated Itinerary for user to be displated");
      console.log(finalItinerary);
      dispatch(setItineraryInputDestinations(finalItinerary));
      console.log("INSPECTOR LOG: Navigating to Itinerary Page");
      navigateToItineraryPage();
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
            <Title size="2" parameter="Try these locations too!"/>
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
          </View>
        </View>

    </View>
  );
}