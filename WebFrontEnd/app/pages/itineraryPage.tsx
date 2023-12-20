import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/reducers/reducers';
import tw from "twrnc";
import DestinationInSchedule from '../components/itineraryPageComponents/destinationInSchedule';
import TopBar from '../components/topBar';
import { createTimeSlots } from '../helpers/dateTimeHelpers/dateTimeFunctions';

export default function ItineraryPage() {
  // Retrieve the finalItinerary from the Redux store
  const finalItinerary = useSelector((state: RootState) => state.itineraryInputDestination.itinerary);
  const travellingPreferences = useSelector((state: RootState) => state.travellingPreferences.travellingPreferences);
  // Retrieve the fixed plans which the users have made already
  const fixedPlansItems = useSelector((state: RootState) => state.individualEventArr.allEvents);
  console.log(fixedPlansItems);

  const timeSlots = createTimeSlots(travellingPreferences.startTime, travellingPreferences.endTime);

  return (
    <View style={tw`h-full`}>
      <TopBar />
      <ScrollView horizontal={true}>
        <View>
          <View style={tw`flex-row`}>
            {timeSlots.map(time =>
              <Text key={time} style={tw`w-20`}>{time}</Text>
            )}
          </View>
          <View style={tw`flex-row my-10`}>
            {finalItinerary.map(item =>
              <DestinationInSchedule firstTimeSlot={travellingPreferences.startTime} destination={item.destination} startingTime={item.startingTime} endingTime={item.endingTime} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
