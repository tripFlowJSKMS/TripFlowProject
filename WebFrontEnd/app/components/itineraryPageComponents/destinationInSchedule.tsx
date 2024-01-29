import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import tw from "twrnc";
import {
  formatTime,
  formatDuration,
} from "@/app/helpers/dateTimeHelpers/dateTimeFunctions";
import { DestinationType } from "../../../../Shared/types";
import { DestinationModal } from "./DestinationModal";

interface DestinationInScheduleProps {
  destinationNotes: string[];
  firstTimeSlot: number;
  destination: DestinationType;
  startingTime: number;
  endingTime: number;
}

export default function DestinationInSchedule({
  destinationNotes,
  firstTimeSlot,
  destination,
  startingTime,
  endingTime,
}: DestinationInScheduleProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const duration = endingTime - startingTime;
  const timeInterval = 60;
  const startingTimeSlot = (startingTime - firstTimeSlot) / timeInterval;
  const durationWidth = duration / timeInterval;

  return (
    <View style={tw`bg-gray-300 rounded p-2 absolute ml-10 w-40 h-${20 * durationWidth} mt-${startingTimeSlot * 20}`}>
      <View style={tw`flex-row`}>
        <Text style={tw`text-lg font-semibold`}>{destination.name}</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text>📝</Text>
        </Pressable>
      </View>
      <Text style={tw`text-gray-500`}>{formatDuration(duration)}</Text>
      <Text style={tw`text-gray-500`}>{`${formatTime(
        startingTime,
      )} - ${formatTime(endingTime)}`}</Text>
      <DestinationModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        destination={destination}
        destinationNotes={destinationNotes}
      />
    </View>
  );
}
