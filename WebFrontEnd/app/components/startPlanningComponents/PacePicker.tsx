import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonRunning, faPersonSnowboarding, faPersonWalking, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function PacePicker( { onPaceChange } ) {
    const [selectedValue, setSelectedValue] = useState("Normal");

    const handleIconClick = (value) => {
        setSelectedValue(value);
        onPaceChange(value);
    };

    return (
        <View>
            <Text style={tw`text-5x1 font-bold w-full mt-4 mb-4`}>Pace</Text>
            <View style={tw`flex flex-row w-full items-center`}>
                <TouchableOpacity
                    onPress={() => handleIconClick("Relaxed")}
                    style={[
                        tw`mr-4 w-[15%]`,
                        selectedValue === "Relaxed" && tw`bg-gray-200`,
                    ]}
                >
                    <FontAwesomeIcon icon={faPersonWalking} />
                </TouchableOpacity>
                <FontAwesomeIcon icon={faArrowRight} style={tw`mx-4 w-[15%]`} />
                <TouchableOpacity
                    onPress={() => handleIconClick("Normal")}
                    style={[
                        tw`mx-4 w-[15%]`,
                        selectedValue === "Normal" && tw`bg-gray-200 h-5`,
                    ]}
                >
                    <FontAwesomeIcon icon={faPersonRunning} />
                </TouchableOpacity>
                <FontAwesomeIcon icon={faArrowRight} style={tw`mx-4 w-[15%]`} />
                <TouchableOpacity
                    onPress={() => handleIconClick("Packed")}
                    style={[
                        tw`mx-4 w-[15%]`,
                        selectedValue === "Packed" && tw`bg-gray-200`,
                    ]}
                >
                    <FontAwesomeIcon icon={faPersonSnowboarding} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
