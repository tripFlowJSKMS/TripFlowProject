import React, { useState } from 'react'
import { View } from 'react-native'
import tw from "twrnc";
import { PickLocationsOutputType } from "../../../Shared/types/pickLocations";
import { RootState } from '@/lib/reducers/reducers';
import { useSelector } from 'react-redux';
import { DestinationType } from '../../../Shared/types';


export default function EditLocationsPage() {

  const destinationsData: PickLocationsOutputType = useSelector((state: RootState) => state.PickLocationsOutputType.destinations);
  const [selectedLocations, setSelectedLocations] = useState<DestinationType[]>([]);


  return (
    <View style={tw`flex flex-col h-full`}>
        <View>test</View>
    </View>
  );
}