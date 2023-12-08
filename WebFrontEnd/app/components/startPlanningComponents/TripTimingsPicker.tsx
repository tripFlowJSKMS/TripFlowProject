import React from "react";
import { View, Text } from "react-native";
import TimeInput from "../timeInput";
import tw from "twrnc";

interface InvalidInputMessageProps {
  visible: boolean;
}

const InvalidInputMessage: React.FC<InvalidInputMessageProps> = ({ visible }) => (
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

function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

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

  const handleStartTimeChange = (value: string) => {
    const minutes: number = timeToMinutes(value);
    onStartTimeChange(minutes);
  };

  const handleEndTimeChange = (value: string) => {
    const minutes: number = timeToMinutes(value);
    onEndTimeChange(minutes);
  };

  return (
    <View style={tw`items-center`}>
      <Text style={tw`text-center text-xl font-bold w-full`}>Preferred Trip Timings</Text>
      <View style={tw`flex flex-row items-center justify-around w-full my-4`}>
        <TimeInput value={minutesToTime(selectedStartTime)} setValue={handleStartTimeChange}/>
        <Text>-</Text>
        <TimeInput value={minutesToTime(selectedEndTime)} setValue={handleEndTimeChange}/>
      </View>
      <InvalidInputMessage visible={selectedStartTime >= selectedEndTime} />
    </View>
  );
}
