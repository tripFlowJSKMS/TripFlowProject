import React, { useState } from "react";
import { View, Text } from "react-native"; // Don't forget to import Text
import TimeInput from "../TimeInput";
import tw from "twrnc";

const InvalidInputMessage = ({ visible }) => (
  <Text style={{ textAlign: 'center', color: 'red', display: visible ? 'flex' : 'none' }}>
    Starting time must be earlier than ending time
  </Text>
);

export default function TripTimingsPicker() {
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");

  return (
    <View>
      <Text style={tw`text-center text-5x1 font-bold w-100 mt-4`}>Preferred Trip Timings</Text>
      <View style={tw`w-full border-t border-gray-1000 my-2`} />
      <View style={tw`flex flex-row mt-3 w-[46%] items-center`}>
        <TimeInput width={75} value={startingTime} setValue={setStartingTime}/>
        <View style={tw`ml-3 mr-3 mb-5`}>-</View>
        <TimeInput width={75} value={endingTime} setValue={setEndingTime}/>
      </View>
      <View style={tw`items-center`}>
        <InvalidInputMessage visible={startingTime >= endingTime} />
      </View>
    </View>
  );
}
