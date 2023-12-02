import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import formatDuration from '@/app/helpers/formatDuration';
import formatTime from '@/app/helpers/formatTime';
import { DestinationType } from '../../../../Shared/types';
import TimeSlots from '../../helpers/createTimeSlots';

interface DestinationInScheduleProps {
    destination: DestinationType;
    startingTime: number;
    endingTime: number;
}

export default function DestinationInSchedule({ destination, startingTime, endingTime }: DestinationInScheduleProps) {
    const duration = endingTime - startingTime;
    const startTimeFormatted = formatTime(startingTime);
    const endTimeFormatted = formatTime(endingTime);
    
    return (
        <View style={styles.card}>
          <Text style={tw`text-lg font-semibold`}>{destination.name}</Text>
          <Text style={tw`text-gray-500`}>{formatDuration(duration)}</Text>
          <Text style={tw`text-sm text-gray-500`}>{`${startTimeFormatted} - ${endTimeFormatted}`}</Text>
        </View>
      );
}

const styles = ({
    card: {
      minWidth: 150,
      marginHorizontal: 8,
      padding: 16,
      borderRadius: 8,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
  