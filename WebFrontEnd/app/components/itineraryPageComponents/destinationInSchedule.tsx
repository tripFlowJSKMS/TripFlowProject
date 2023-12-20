import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import formatDuration from '@/app/helpers/formatDuration';
import formatTime from '@/app/helpers/formatTime';
import { DestinationType } from '../../../../Shared/types';

interface DestinationInScheduleProps {
    firstTimeSlot: number,
    destination: DestinationType;
    startingTime: number;
    endingTime: number;
}

export default function DestinationInSchedule({ firstTimeSlot, destination, startingTime, endingTime }: DestinationInScheduleProps) {
    const duration = endingTime - startingTime;
    const startTimeFormatted = formatTime(startingTime);
    const endTimeFormatted = formatTime(endingTime);
    const startingTimeSlot = (startingTime - firstTimeSlot) / 30;
    const durationWidth = duration / 30;

    return (
        <View style={tw`bg-gray-300 rounded p-2 absolute w-${20 * durationWidth} ml-${startingTimeSlot * 20}`}>
          <Text style={tw`text-lg font-semibold`}>{destination.name}</Text>
          <Text style={tw`text-gray-500`}>{formatDuration(duration)}</Text>
          <Text style={tw`text-gray-500`}>{`${startTimeFormatted} - ${endTimeFormatted}`}</Text>
        </View>
      );
}
