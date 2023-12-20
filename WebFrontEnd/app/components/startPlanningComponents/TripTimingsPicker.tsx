import React from "react";
import { View, Text } from "react-native";
import TimeInput from "./TimeInput";
import tw from "twrnc";

interface TripTimingsPickerProps {
  selectedStartTime: number;
  selectedEndTime: number;
  onStartTimeChange: (value: number) => void;
  onEndTimeChange: (value: number) => void;
}

export default function TripTimingsPicker({
  selectedStartTime,
  selectedEndTime,
  onStartTimeChange,
  onEndTimeChange,
}: TripTimingsPickerProps ) {

  return (
    <View style={tw`items-center`}>
      <Text style={tw`text-center text-xl font-bold w-full`}>Preferred Trip Timings</Text>
      <View style={tw`flex flex-row items-center justify-around w-full my-4`}>
        <TimeInput setValue={onStartTimeChange}/>
        <Text>-</Text>
        <TimeInput setValue={onEndTimeChange}/>
      </View>
      <Text style={tw.style('text-red-500', selectedStartTime < selectedEndTime && 'hidden')}>Starting time must be earlier than ending time</Text>
    </View>
  );
}
