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
  pace: ScheduleType;
  setPace: (pace: ScheduleType) => void;
}
export default function PacePicker({ pace, setPace }: PacePickerProps) {

  return (
    <View>
      <Text style={tw`text-base font-bold my-5`}>Pace</Text>
      <View style={tw`flex flex-row w-full items-center justify-between`}>
        <TouchableOpacity onPress={() => setPace("Relaxed")} style={pace === "Relaxed" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonWalking} />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faArrowRight} />
        <TouchableOpacity onPress={() => setPace("Normal")} style={pace === "Normal" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonRunning} />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faArrowRight} />
        <TouchableOpacity onPress={() => setPace("Packed")} style={pace === "Packed" && tw`text-4xl`}>
          <FontAwesomeIcon icon={faPersonSnowboarding} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
