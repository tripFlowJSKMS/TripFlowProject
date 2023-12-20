import React from "react";
import tw from "twrnc";
import { PaxNumberType } from "../../../../Shared/types";
import { Picker } from "@react-native-picker/picker";
import { View, Text } from "react-native";

interface PaxPickerProps {
    setPaxNumber: (value: PaxNumberType) => void;
}

export default function PaxPicker({ setPaxNumber}: PaxPickerProps ) {
    const paxOptions: PaxNumberType[] = ["1", "2", "3-5", "6 or more"];

    return (
        <View>
            <Text style={tw`text-base font-bold my-3`}>Pax:</Text>
            <Picker style={tw`rounded-lg p-2`} onValueChange={(itemValue: PaxNumberType) => setPaxNumber(itemValue)}>
                {paxOptions.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
                ))}
            </Picker>
        </View>
      );
}
