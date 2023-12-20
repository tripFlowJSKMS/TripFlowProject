import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { formatTime, formatDuration } from '@/app/helpers/dateTimeHelpers/dateTimeFunctions';
import { DestinationType } from '../../../../Shared/types';

interface DestinationInScheduleProps {
    firstTimeSlot: number,
    destination: DestinationType;
    startingTime: number;
    endingTime: number;
}

export default function DestinationInSchedule({ firstTimeSlot, destination, startingTime, endingTime }: DestinationInScheduleProps) {
    const duration = endingTime - startingTime;
    const timeInterval = 30;
    const startingTimeSlot = (startingTime - firstTimeSlot) / timeInterval;
    const durationWidth = duration / timeInterval;

    return (
        <View style={tw`bg-gray-300 rounded p-2 absolute w-${20 * durationWidth} ml-${startingTimeSlot * 20}`}>
          <View style={tw`flex-row`}>
            <Text style={tw`text-lg font-semibold`}>{destination.name}</Text>
            <TouchableOpacity><Text>📝</Text></TouchableOpacity>
          </View>
          <Text style={tw`text-gray-500`}>{formatDuration(duration)}</Text>
          <Text style={tw`text-gray-500`}>{`${formatTime(startingTime)} - ${formatTime(endingTime)}`}</Text>
        </View>
      );
}
