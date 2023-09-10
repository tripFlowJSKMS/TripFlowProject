import Button from "@/components/UI/Button";
import PreferenceItem from "@/components/onboarding/PreferenceItem";
import useOnboardingStore from "@/store/onboardingStore";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { numberToTime } from "@/lib/utils";
import ProgressSegments from "@/components/UI/ProgressSegments";
import StartPlanningDepartureView from "@/components/startPlanning/StartPlanningDepartureView";
import StartPlanningDateTimeView from "@/components/startPlanning/StartPlanningDateTimeView";

export default function OnboardingPage() {
  const statesArray = [
    "Departure",
    "Time",
    "Preferences",
    "Submission",
  ] as const;
  type State = (typeof statesArray)[number];
  const [state, setState] = useState<State>("Departure");
  const isDepartureState = state === "Departure";
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

  return (
    <View style={tw`bg-slate-200 relative h-full w-full`}>
      <Text
        style={tw`mt-28 text-slate-800 text-center text-3xl font-extrabold`}
      >
        Your ideal trip awaits
      </Text>
      <View
        style={tw`mt-10 flex flex-row flex-wrap items-start gap-10 justify-center bg-slate-200 w-full h-full px-8`}
      >
        {isDepartureState && <StartPlanningDepartureView />}
        {isTimeState && <StartPlanningDateTimeView />}
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
      <View style={tw`absolute bottom-10 w-full px-10`}>
        <View style={tw`flex flex-row justify-center mb-4 gap-x-16`}>
          <Button
            disabled={!!isFirstState}
            onPress={() => setPreviousState(state)}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </Button>
          <Button disabled={!!isLastState} onPress={() => setNextState(state)}>
            <Entypo name="chevron-right" size={24} color="black" />
          </Button>
        </View>
        <ProgressSegments
          currentSegment={
            statesArray.findIndex((arrayEle) => arrayEle === state) + 1
          }
          totalSegments={statesArray.length}
        />
      </View>
    </View>
  );
}
