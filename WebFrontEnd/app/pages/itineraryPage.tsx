import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/reducers/reducers';
import tw from "twrnc";
import DestinationInSchedule from '../components/itineraryPageComponents/destinationInSchedule';
import TopBar from '../components/topBar';
import { createTimeSlots, getDateRangeArray } from '../helpers/dateTimeHelpers/dateTimeFunctions';

export default function ItineraryPage() {
  const travellingPreferences = useSelector((state: RootState) => state.travellingPreferences.travellingPreferences);
  // Retrieve the finalItinerary from the Redux store
  const finalItinerary = useSelector((state: RootState) => state.itineraryInputDestination.itinerary);
  // Retrieve the fixed plans which the users have made already
  // const fixedPlansItems = useSelector((state: RootState) => state.individualEventArr.allEvents);
  const destinationNotes = useSelector((state: RootState) => state.destinationNotes.destinationNotes);
  const timeSlots = createTimeSlots(travellingPreferences.startTime, travellingPreferences.endTime);
  const dateRange: string[] = getDateRangeArray(travellingPreferences.startDate, travellingPreferences.endDate);

  return (
    <View>
      <TopBar />
      <View style={tw`w-full items-center justify-center`}>
        <View style={tw`w-11/12 h-5/6 bg-slate-100 rounded`}>
          <ScrollView>
            <View style={tw`flex-row`}>
              <View style={tw`w-1/12`}>
                <View style={tw`h-5 my-2 border-r`} />
                <View>
                  {timeSlots.map(time =>
                    <Text key={time} style={tw`h-20 text-center`}>{time}</Text>
                  )}
                </View>
              </View>
              <View>
                <View style={tw`flex-row py-2`}>
                  {dateRange.map(date =>
                    <Text key={date} style={tw`w-40 border-r text-center`}>{date}</Text>)}
                </View>
                <View>
                  {finalItinerary.map(item =>
                    <DestinationInSchedule key={item.destination.id} destinationNotes={destinationNotes[item.destination.name]} firstDateSlot={travellingPreferences.startDate} firstTimeSlot={travellingPreferences.startTime} destination={item.destination} destinationDate={item.stringDate} startingTime={item.startingTime} endingTime={item.endingTime} />
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );


}
