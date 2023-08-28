import tw from "twrnc";
import { View } from "react-native";

interface ProgressSegmentsProps {
  totalSegments: number;
  currentSegment: number;
}

export default function ProgressSegments({
  totalSegments,
  currentSegment,
}: ProgressSegmentsProps) {
  if (currentSegment > totalSegments) {
    throw new Error("Current segment cannot be greater than total segments");
  }
  if (totalSegments < 1 || currentSegment < 1) {
    throw new Error("Segments must be greater than 0");
  }
  let componentArray = [];
  for (let i = 0; i < totalSegments; i++) {
    componentArray.push(
      <View
        style={tw`flex-1 first:rounded-l-lg last:rounded-r-lg + ${
          i < currentSegment ? "bg-slate-500" : "bg-slate-200"
        }`}
      ></View>,
    );
  }
  return <View style={tw`flex flex-row gap-x-4`}>{componentArray}</View>;
}
