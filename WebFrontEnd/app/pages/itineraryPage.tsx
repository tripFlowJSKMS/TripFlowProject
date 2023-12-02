import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/reducers/reducers';
import tw from "twrnc";
import DestinationInSchedule from '../components/itineraryPageComponents/destinationInSchedule';
import TopBar from '../components/topBar';
import formatTime from '../helpers/formatTime';
import createTimeSlots from '../helpers/createTimeSlots';

export default function ItineraryPage() {
  // Retrieve the finalItinerary from the Redux store
  const finalItinerary = useSelector((state: RootState) => state.itineraryInputDestination.itinerary);
  const travellingPreferences = useSelector((state: RootState) => state.travellingPreferences.travellingPreferences);
  const totalSlots = (travellingPreferences.endTime - travellingPreferences.startTime) / 30;
  console.log(`Total slots: ${totalSlots}`);

  const startTimeFormatted: string = formatTime(travellingPreferences.startTime);
  const endTimeFormatted: string = formatTime(travellingPreferences.endTime);
  const timeSlots = createTimeSlots(startTimeFormatted, endTimeFormatted);

  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar />
      <ScrollView style={tw`bg-white`} horizontal={true}>
        <View style={tw`flex flex-row`}>
          {/* Time Slot Headers */}
          {timeSlots.map((time, index) => (
            <View key={index} style={tw`p-2 w-15`}>
              <Text style={tw`text-center`}>{time}</Text>
            </View>
          ))}
        </View>

        <View style={tw`flex flex-row`}> 
          {/* Itinerary Cards */}
          {finalItinerary.map((item, index) => (
            <DestinationInSchedule key={index} destination={item.destination} startingTime={item.startingTime} endingTime={item.endingTime}/>
          ))}
        </View> 
      </ScrollView> 
    </View>
  );
}
