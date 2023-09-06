import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

export default function AreasOfInterestPicker( { onAreasOfInterestChange }) {
    const areasOfInterest: string[] = ["Sports", "Music", "Outdoors", "Food", "Art", "Shopping"];
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

    const handleInterestToggle = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            const temp: string[] = selectedInterests.filter(item => item !== interest)
            setSelectedInterests(temp);
            onAreasOfInterestChange(temp)
            
        } else {
            const temp: string[] = [...selectedInterests, interest]
            setSelectedInterests(temp);
            onAreasOfInterestChange(temp);
        }
    };

    return (
        <View>
            <Text style={tw`text-center text-5x1 font-bold w-full mt-4`}>Areas of Interest</Text>
            <View style={tw`flex flex-wrap justify-center mt-4`}>
                {areasOfInterest.map((interest, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleInterestToggle(interest)}
                        style={[
                            tw`bg-gray-300 rounded-full px-4 py-2 m-2`,
                            selectedInterests.includes(interest) && tw`bg-blue-500`,
                        ]}
                    >
                        <Text style={[tw`text-center`, selectedInterests.includes(interest) && tw`text-white`]}>
                            {interest}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
