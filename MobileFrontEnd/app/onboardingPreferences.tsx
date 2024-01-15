import Button from "@/components/UI/Button";
import { View, Text, Dimensions, Pressable, Keyboard } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import ProgressSegments from "@/components/UI/ProgressSegments";
import StartPlanningDepartureView from "@/components/onboarding/StartPlanningDepartureView";
import StartPlanningDateTimeView from "@/components/onboarding/StartPlanningDateTimeView";
import { Link } from "expo-router";
import StartPlanningPreferenceView from "@/components/onboarding/StartPlanningPreferenceView";
import useOnboardingStore from "@/store/onboardingStore";

const { height, width } = Dimensions.get("window");

export default function OnboardingPage() {
  const statesArray = ["Departure", "Time", "Preferences", "Share"] as const;
  type State = (typeof statesArray)[number];
  const [state, setState] = useState<State>("Departure");
  const isDepartureState = state === "Departure";
  const isPreferencesState = state === "Preferences";
  const isTimeState = state === "Time";
  const isShareState = state === "Share";
  const isLastState = state === statesArray[statesArray.length - 1];
  const isFirstState = state === statesArray[0];

  const { startDate, endDate } = useOnboardingStore();

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

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View
        style={tw.style(`bg-slate-200 relative h-full w-full`, {
          height: height,
          width: width,
        })}
      >
        <Text
          style={tw`mt-28 text-slate-800 text-center text-3xl font-extrabold`}
        >
          Your ideal trip awaits
        </Text>
        <View style={tw`mt-10 bg-slate-200 w-full h-full px-8`}>
          {isDepartureState && <StartPlanningDepartureView />}
          {isTimeState && <StartPlanningDateTimeView />}
          {isPreferencesState && <StartPlanningPreferenceView />}
          {isShareState && (
            <View style={tw`items-center justify-center gap-y-4`}>
              <Link href="/itineraryPlanning" asChild>
                <Button className="rounded-full h-48 w-48">
                  <Text style={tw`text-2xl font-medium`}>Let's go!</Text>
                </Button>
              </Link>
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
            <Button
              disabled={!!isLastState || (startDate > endDate && isTimeState)}
              onPress={() => setNextState(state)}
            >
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
    </Pressable>
  );
}
