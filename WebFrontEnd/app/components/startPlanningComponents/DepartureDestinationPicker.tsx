import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc";

const cities = [ "Singapore", "Singaaa", "Singggb", "Cambodia", "Laos", "Malaysia", "Thailand" ];

const filterCountries = (query) => {
    return cities.filter(country =>
      country.toLowerCase().startsWith(query.toLowerCase())
    );
};

export default function DepartureDestinationPicker({ onDepartureLocationChange, onDestinationLocationChange }) {
    const [departureQuery, setDepartureQuery] = useState("");
    const [destinationQuery, setDestinationQuery] = useState("");
    const [departureData, setDepartureData] = useState([]);
    const [destinationData, setDestinationData] = useState([]);
  
    const handleDepartureItemPress = (item) => {
        setDepartureQuery(item);
        setDepartureData([]);
        onDepartureLocationChange(item); // Notify parent component of the selection
    };

    const handleDestinationItemPress = (item) => {
        setDestinationQuery(item);
        setDestinationData([]);
        onDestinationLocationChange(item); // Notify parent component of the selection
    };
  
    return (
        <View>
            {/* Departure section */}
            <Text style={tw`text-5x1 font-bold w-full mt-4 mb-4`}>Departure</Text>
            <TextInput
                style={tw`h-10 border rounded-md p-2`}
                value={departureQuery}
                onChangeText={(text) => {
                    setDepartureQuery(text);
                    setDepartureData(filterCountries(text));
                }}
                placeholder="Search for a city"
                placeholderTextColor="#888"
            />
            {departureQuery.length > 0 && departureData.length != 0 && (
            <FlatList
                data={departureData}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDepartureItemPress(item)}>
                    <Text style={tw`p-2 text-lg border-b`}>{item}</Text>
                </TouchableOpacity>
                )}
                style={tw`max-h-200 border p-2`}
            />
            )}

            {/* Destination section */}
            <Text style={tw`text-5x1 font-bold w-full mt-4 mb-4`}>Destination</Text>
            <TextInput
                style={tw`h-10 border rounded-md p-2`}
                value={destinationQuery}
                onChangeText={(text) => {
                    setDestinationQuery(text);
                    setDestinationData(filterCountries(text));
                }}
                placeholder="Search for a city"
                placeholderTextColor="#888"
            />
            {destinationQuery.length > 0 && destinationData.length != 0 && (
            <FlatList
                data={destinationData}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDestinationItemPress(item)}>
                    <Text style={tw`p-2 text-lg border-b`}>{item}</Text>
                </TouchableOpacity>
                )}
                style={tw`max-h-200 border p-2`}
            />
            )}
        </View>
    );
}
    
    
    
    
    
    