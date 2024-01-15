import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import tw from "twrnc";
import { AreasOfInterestType } from "../../../../Shared/types";

interface AreasOfInterestPickerProps {
  onAreasOfInterestChange: (value: AreasOfInterestType[]) => void;
}
export default function AreasOfInterestPicker({
  onAreasOfInterestChange,
}: AreasOfInterestPickerProps) {
  const areasOfInterest: AreasOfInterestType[] = [
    "Sports",
    "Music",
    "Outdoors",
    "Food",
    "Art",
    "Shopping",
  ];
  const [selectedInterests, setSelectedInterests] = useState<
    AreasOfInterestType[]
  >([]);

  const handleInterestToggle = (interest: AreasOfInterestType) => {
    if (selectedInterests.includes(interest)) {
      const temp: AreasOfInterestType[] = selectedInterests.filter(
        (item) => item !== interest,
      );
      setSelectedInterests(temp);
      onAreasOfInterestChange(temp);
    } else {
      const temp: AreasOfInterestType[] = [...selectedInterests, interest];
      setSelectedInterests(temp);
      onAreasOfInterestChange(temp);
    }
  };

  return (
    <View style={tw`w-full items-center`}>
      <Text style={tw`text-center text-xl font-bold mb-3`}>
        Areas of Interest
      </Text>
      {areasOfInterest.map((interest, index) => (
        <Pressable
          key={index}
          onPress={() => handleInterestToggle(interest)}
          style={[
            tw`bg-gray-300 rounded-full p-2 m-2 w-full`,
            selectedInterests.includes(interest) && tw`bg-blue-500`,
          ]}
        >
          <Text
            style={[
              tw`text-center`,
              selectedInterests.includes(interest) && tw`text-white`,
            ]}
          >
            {interest}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
