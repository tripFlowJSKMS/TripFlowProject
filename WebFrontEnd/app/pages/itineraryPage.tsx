import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/reducers/reducers';
import tw from "twrnc";
import DestinationInSchedule from '../components/itineraryPageComponents/destinationInSchedule';
import TopBar from '../components/topBar';
import { createTimeSlots } from '../helpers/dateTimeHelpers/dateTimeFunctions';

export default function ItineraryPage() {
  const travellingPreferences = useSelector((state: RootState) => state.travellingPreferences.travellingPreferences);
  // Retrieve the finalItinerary from the Redux store
  const finalItinerary = useSelector((state: RootState) => state.itineraryInputDestination.itinerary);
  // Retrieve the fixed plans which the users have made already
  // const fixedPlansItems = useSelector((state: RootState) => state.individualEventArr.allEvents);
  const destinationNotes = useSelector((state: RootState) => state.destinationNotes.destinationNotes);
  const timeSlots = createTimeSlots(travellingPreferences.startTime, travellingPreferences.endTime);

  const getDateRangeArray = (startDate, endDate) => {
    let dateArray = [];
    let currentDate = new Date(startDate);
    let end = new Date(endDate);

    while (currentDate <= end) {
      dateArray.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };
  const dateRange = getDateRangeArray(travellingPreferences.startDate, travellingPreferences.endDate);

  return (
    <View>
      <TopBar />
      <View style={tw`w-full items-center justify-center`}>
        <View style={tw`w-11/12 h-5/6 bg-slate-100 rounded`}>
          <ScrollView>
            <View style={tw`flex-row`}>
              <View style={tw`w-1/12 border-r border-dashed`}>
                {timeSlots.map(time =>
                  <Text key={time} style={tw`h-20 text-center`}>{time}</Text>
                )}
              </View>
              <View>
                {finalItinerary.map(item =>
                  <DestinationInSchedule key={item.destination.id} destinationNotes={destinationNotes[item.destination.name]} firstTimeSlot={travellingPreferences.startTime} destination={item.destination} startingTime={item.startingTime} endingTime={item.endingTime} />
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );


}
