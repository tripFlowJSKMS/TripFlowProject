import Button from "@/components/Button";
import PreferenceItem from "@/components/onboarding/PreferenceItem";
import useOnboardingStore from "@/store/onboardingStore";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { numberToTime } from "@/lib/utils";

const SLIDER_LENGTH = 300;

export default function OnboardingPage() {
  const statesArray = ["Preferences", "Time", "Submission"] as const;
  type State = (typeof statesArray)[number];
  const [state, setState] = useState<State>("Preferences");
  const isPreferencesState = state === "Preferences";
  const isTimeState = state === "Time";
  const isSubmissionState = state === "Submission";
  const isLastState = state === statesArray[statesArray.length - 1];
  const isFirstState = state === statesArray[0];

  const setNextState = (currentState: State) => {
    const index = statesArray.findIndex((state) => state === currentState);
    // if on last state, do nothing
    if (index === statesArray.length - 1) {
      return;
    }
    setState(statesArray[index + 1]);
  };

  const setPreviousState = (currentState: State) => {
    const index = statesArray.findIndex((state) => state === currentState);
    // if on first state, do nothing
    if (index === 0) {
      return;
    }
    setState(statesArray[index - 1]);
  };

  const onboardingStore = useOnboardingStore();

  const preferences = onboardingStore.preferences;
  const togglePreference = onboardingStore.togglePreference;
  const startTime = onboardingStore.startTime;
  const endTime = onboardingStore.endTime;
  const setStartTime = onboardingStore.setStartTime;
  const setEndTime = onboardingStore.setEndTime;

  return (
    <View style={tw`bg-slate-800 relative h-full w-full`}>
      <Text style={tw`mt-20 text-slate-200 text-center text-3xl font-medium`}>
        {isPreferencesState && "Select Preferences"}
        {isTimeState && "Select Time Period"}
      </Text>
      <View
        style={tw`mt-10 flex flex-row flex-wrap items-start gap-10 justify-center bg-slate-800 w-full`}
      >
        {isPreferencesState &&
          preferences.map((preference) => {
            return (
              <PreferenceItem
                key={preference.name}
                preference={preference}
                onPress={() => togglePreference(preference.name)}
              />
            );
          })}
        {isTimeState && (
          <OnboardingTimeSlider
            startTime={startTime}
            endTime={endTime}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
          />
        )}
        {isSubmissionState && (
          <View style={tw`flex flex-col items-center justify-center`}>
            <Text style={tw`text-slate-200 text-center text-3xl font-medium`}>
              Preferences:{" "}
              {preferences
                .map((preference) =>
                  preference.selected ? preference.name : null,
                )
                .join(", ")}
            </Text>
            <Text style={tw`text-slate-200 text-center text-3xl font-medium`}>
              Start time: {numberToTime(startTime)}
            </Text>
            <Text style={tw`text-slate-200 text-center text-3xl font-medium`}>
              End time: {numberToTime(endTime)}
            </Text>
          </View>
        )}
      </View>
      {!isFirstState && (
        <View style={tw`absolute bottom-5 left-5`}>
          <Button onPress={() => setPreviousState(state)}>
            <Entypo name="chevron-left" size={24} color="black" />
          </Button>
        </View>
      )}
      {!isLastState && (
        <View style={tw`absolute bottom-5 right-5`}>
          <Button onPress={() => setNextState(state)}>
            <Entypo name="chevron-right" size={24} color="black" />
          </Button>
        </View>
      )}
    </View>
  );
}

interface OnboardingTimeSliderProps {
  startTime: number;
  endTime: number;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
}

function OnboardingTimeSlider({
  startTime,
  endTime,
  setStartTime,
  setEndTime,
}: OnboardingTimeSliderProps) {
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
      minMarkerOverlapDistance={50} // 50px between markers
    />
  );
}

const width = 50;

interface LabelBaseProps {
  position: number;
  value: string;
}

function LabelBase({ position, value }: LabelBaseProps) {
  return (
    <View style={tw`absolute top-7 left-[${position - width / 2}px]`}>
      <Text style={tw`mt-4 text-slate-200 flex items-center justify-center`}>
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
