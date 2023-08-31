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
        key={i}
        style={tw.style(
          `h-4 flex-1`,
          i < currentSegment ? "bg-slate-500" : "bg-slate-300",
          i == 0 && "rounded-l-lg",
          i == totalSegments - 1 && "rounded-r-lg",
        )}
      ></View>,
    );
  }
  return <View style={tw`flex flex-row gap-x-1`}>{componentArray}</View>;
}
