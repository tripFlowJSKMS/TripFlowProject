import React from "react";
import tw from "twrnc";
import { DietaryPreferenceType } from "../../../../Shared/types";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

interface DietaryPreferencePickerProps {
    setDietaryPreference: (value: DietaryPreferenceType) => void;
}

export default function DietaryPreferencePicker({ setDietaryPreference }: DietaryPreferencePickerProps ) {
    const DietaryPreferenceOptions: DietaryPreferenceType[] = [ "Normal", "Halal", "Vegetarian", "Vegan" ];

    return (
        <View>
            <Text style={tw`text-base font-bold my-3 w-full`}>Dietary Preference:</Text>
            <Picker style={tw`rounded-lg p-2`} onValueChange={(itemValue: DietaryPreferenceType) => setDietaryPreference(itemValue)}>
                {DietaryPreferenceOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
        </View>
      );
}
