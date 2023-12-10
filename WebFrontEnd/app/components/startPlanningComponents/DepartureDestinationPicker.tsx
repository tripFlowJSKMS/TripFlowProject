import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';

const cities: string[] = ['Singapore', 'Singaaa', 'Singggb', 'Cambodia', 'Laos', 'Malaysia', 'Thailand'];

function filterCountries(query: string): string[] {
  return cities.filter(country =>
    country.toLowerCase().startsWith(query.toLowerCase())
  );
}

interface DepartureDestinationPickerProps {
  onDepartureLocationChange: (value: string) => void;
  onDestinationLocationChange: (value: string) => void;
}

export default function DepartureDestinationPicker({ onDepartureLocationChange, onDestinationLocationChange }: DepartureDestinationPickerProps) {
  const [departureQuery, setDepartureQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [departureData, setDepartureData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [isDepartureListVisible, setIsDepartureListVisible] = useState(false);
  const [isDestinationListVisible, setIsDestinationListVisible] = useState(false);

  const handleDepartureItemPress = (item: string) => {
    setDepartureQuery(item);
    setDepartureData([]);
    onDepartureLocationChange(item);
    setIsDepartureListVisible(false); // Close departure FlatList
  };

  const handleDestinationItemPress = (item: string) => {
    setDestinationQuery(item);
    setDestinationData([]);
    onDestinationLocationChange(item);
    setIsDestinationListVisible(false); // Close destination FlatList
  };

  return (
    <View style={tw`z-10`}>
      <Text style={tw`text-xl font-bold w-full my-3`}>Departure</Text>
      <TextInput
        style={tw`border rounded-md p-3`}
        value={departureQuery}
        onChangeText={(text) => {
          setDepartureQuery(text);
          setDepartureData(filterCountries(text));
          setIsDepartureListVisible(true);
          setIsDestinationListVisible(false);
        }}
        placeholder="Search for a city"
        placeholderTextColor="#888"
      />

      <Text style={tw`text-xl font-bold w-full my-3`}>Destination</Text>
      <TextInput
        style={tw`border rounded-md p-3`}
        value={destinationQuery}
        onChangeText={(text) => {
          setDestinationQuery(text);
          setDestinationData(filterCountries(text));
          setIsDepartureListVisible(false);
          setIsDestinationListVisible(true);
        }}
        placeholder="Search for a city"
        placeholderTextColor="#888"
      />

      {(isDepartureListVisible && departureQuery.length > 0 && departureData.length != 0) && (
        <FlatList
          data={departureData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDepartureItemPress(item)}>
              <Text style={tw`p-2 text-lg border-b`}>{item}</Text>
            </TouchableOpacity>
          )}
          style={[styles.list, { top: '50%' }]} // Adjust top as necessary
          keyboardShouldPersistTaps="handled"
        />
      )}

      {(isDestinationListVisible && destinationQuery.length > 0 && destinationData.length != 0) && (
        <FlatList
          data={destinationData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDestinationItemPress(item)}>
              <Text style={tw`p-2 text-lg border-b`}>{item}</Text>
            </TouchableOpacity>
          )}
          style={[styles.list, { top: '100%' }]} // Adjust top to place it below the Destination input
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    list: {
        position: 'absolute',
        left: 0,
        right: 0,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        zIndex: 4, // This should be higher than the input container
    },
});
