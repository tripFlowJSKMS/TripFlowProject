import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { formatTime, formatDuration } from '@/app/helpers/dateTimeHelpers/dateTimeFunctions';
import { DestinationType } from '../../../../Shared/types';
import { DestinationModal } from './DestinationModal';

interface DestinationInScheduleProps {
    destinationNotes: string[],
    firstTimeSlot: number,
    destination: DestinationType,
    startingTime: number,
    endingTime: number
}

export default function DestinationInSchedule({ destinationNotes, firstTimeSlot, destination, startingTime, endingTime }: DestinationInScheduleProps) {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const duration = endingTime - startingTime;
    const timeInterval = 30;
    const startingTimeSlot = (startingTime - firstTimeSlot) / timeInterval;
    const durationWidth = duration / timeInterval;

    return (
        <View style={tw`bg-gray-300 rounded p-2 absolute w-${20 * durationWidth} ml-${startingTimeSlot * 20}`}>
          <View style={tw`flex-row`}>
            <Text style={tw`text-lg font-semibold`}>{destination.name}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}><Text>📝</Text></TouchableOpacity>
          </View>
          <Text style={tw`text-gray-500`}>{formatDuration(duration)}</Text>
          <Text style={tw`text-gray-500`}>{`${formatTime(startingTime)} - ${formatTime(endingTime)}`}</Text>
          <DestinationModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} destination={destination} destinationNotes={destinationNotes} />
        </View>
      );
}
