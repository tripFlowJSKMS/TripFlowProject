import React, { useState } from "react";
import { View, Text } from "react-native"; // Don't forget to import Text
import TimeInput from "../timeInput";
import tw from "twrnc";

const InvalidInputMessage = ({ visible }) => (
  <Text
    style={{
      textAlign: "center",
      color: "red",
      display: visible ? "flex" : "none",
    }}
  >
    Starting time must be earlier than ending time
  </Text>
);

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hoursStr = hours.toString().padStart(2, "0");
  const minsStr = mins.toString().padStart(2, "0");
  return `${hoursStr}:${minsStr}`;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export default function TripTimingsPicker({
  selectedStartTime,
  selectedEndTime,
  onStartTimeChange,
  onEndTimeChange,
}) {
  const handleStartTimeChange = (value: number) => {
    selectedStartTime = minutesToTime(value);
    onStartTimeChange(timeToMinutes(value));
  };

  const handleEndTimeChange = (value: number) => {
    selectedEndTime = value;
    onEndTimeChange(timeToMinutes(value));
  };

  return (
    <View>
      <Text style={tw`text-center text-5x1 font-bold w-full mt-4`}>
        Preferred Trip Timings
      </Text>
      <View style={tw`w-full border-t border-gray-100 my-2`} />
      <View style={tw`flex flex-row mt-3 w-[48%] items-center`}>
        <TimeInput
          width={75}
          value={minutesToTime(selectedStartTime)}
          setValue={handleStartTimeChange}
        />
        <Text style={tw`ml-3 mr-3 mb-5`}>-</Text>
        <TimeInput
          width={75}
          value={minutesToTime(selectedEndTime)}
          setValue={handleEndTimeChange}
        />
      </View>
      <View style={tw`items-center`}>
        <InvalidInputMessage visible={selectedStartTime >= selectedEndTime} />
      </View>
    </View>
  );
}
