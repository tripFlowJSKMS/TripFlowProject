import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { numberToTime } from "@/lib/utils";
import { View, Text } from "react-native";
import tw from "twrnc";

interface StartPlanningTimeSliderProps {
  startTime: number;
  endTime: number;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}

const SLIDER_LENGTH = 270;

export default function StartPlanningTimeSlider({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: StartPlanningTimeSliderProps) {
  const multiSliderValues = [startTime, endTime];

  return (
    <MultiSlider
      sliderLength={SLIDER_LENGTH}
      values={multiSliderValues}
      min={360} // 6am earliest start
      max={1560} //2am latest end
      step={5} //5 min intervals
      onValuesChange={(values) => {
        setStartTime(values[0]);
        setEndTime(values[1]);
      }}
      enableLabel={true}
      customLabel={SliderCustomLabel(numberToTime)}
      allowOverlap={false}
      minMarkerOverlapDistance={90} // min 6 hrs between markers, 15px represent 1hr
    />
  );
}

// ADJUST THIS TO CHANGE THE WIDTH OF THE LABEL TO CENTRE IT
const width = 65;

interface LabelBaseProps {
  position: number;
  value: string;
}

function LabelBase({ position, value }: LabelBaseProps) {
  return (
    <View style={tw`absolute top-7 left-[${position - width / 2}px]`}>
      <Text
        style={tw`mt-4 text-slate-800 font-medium text-lg flex items-center justify-center`}
      >
        {value}
      </Text>
    </View>
  );
}

function SliderCustomLabel(textTransformer: (value: number) => string) {
  return function ({
    oneMarkerValue,
    twoMarkerValue,
    oneMarkerLeftPosition,
    twoMarkerLeftPosition,
  }: {
    oneMarkerValue: string | number;
    twoMarkerValue: string | number;
    oneMarkerLeftPosition: number;
    twoMarkerLeftPosition: number;
  }) {
    return (
      <View>
        <LabelBase
          position={oneMarkerLeftPosition}
          value={textTransformer(oneMarkerValue as number)}
        />
        {twoMarkerValue ? (
          <LabelBase
            position={twoMarkerLeftPosition}
            value={textTransformer(twoMarkerValue as number)}
          />
        ) : null}
      </View>
    );
  };
}
