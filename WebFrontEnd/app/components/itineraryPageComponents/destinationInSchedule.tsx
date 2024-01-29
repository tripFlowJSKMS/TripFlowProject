import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import tw from "twrnc";
import {
  formatTime,
  formatDuration,
} from "@/app/helpers/dateTimeHelpers/dateTimeFunctions";
import moment from 'moment';
import { DestinationType } from "../../../../Shared/types";
import { DestinationModal } from "./DestinationModal";

interface DestinationInScheduleProps {
  destinationNotes: string[];
  firstDateSlot: string;
  firstTimeSlot: number;
  destination: DestinationType;
  destinationDate: string;
  startingTime: number;
  endingTime: number;
}

export default function DestinationInSchedule({
  destinationNotes,
  firstDateSlot,
  firstTimeSlot,
  destination,
  destinationDate,
  startingTime,
  endingTime,
}: DestinationInScheduleProps) {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const duration = endingTime - startingTime;
  const timeInterval = 60;
  const startingTimeSlot = (startingTime - firstTimeSlot) / timeInterval;
  const durationWidth = duration / timeInterval;
  const dateWidth = moment(destinationDate).diff(moment(firstDateSlot), "days");

  return (
    <View style={tw`bg-gray-300 rounded p-2 absolute ml-${dateWidth*40} w-40 h-${20 * durationWidth} mt-${startingTimeSlot * 20}`}>
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
