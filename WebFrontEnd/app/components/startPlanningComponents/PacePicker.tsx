import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonRunning,
  faPersonSnowboarding,
  faPersonWalking,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { ScheduleType } from "../../../../Shared/types";

interface PacePickerProps {
  onPaceChange: (value: ScheduleType) => void;
}
export default function PacePicker({ onPaceChange }: PacePickerProps) {
  const [selectedValue, setSelectedValue] = useState("Normal");

  const handleIconClick = (value: ScheduleType) => {
    setSelectedValue(value);
    onPaceChange(value);
  };

  return (
    <View>
      <Text style={tw`text-xl font-bold my-5`}>Pace</Text>
      <View style={tw`flex flex-row w-full items-center justify-between`}>
        <TouchableOpacity onPress={() => handleIconClick("Relaxed")} style={selectedValue === "Relaxed" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonWalking} />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faArrowRight} />
        <TouchableOpacity onPress={() => handleIconClick("Normal")} style={selectedValue === "Normal" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonRunning} />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faArrowRight} />
        <TouchableOpacity onPress={() => handleIconClick("Packed")} style={selectedValue === "Packed" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonSnowboarding} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
