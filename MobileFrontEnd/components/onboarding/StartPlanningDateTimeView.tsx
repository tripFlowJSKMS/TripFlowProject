import useOnboardingStore from "@/store/onboardingStore";
import StartPlanningTimeSlider from "@/components/onboarding/StartPlanningTimeSlider";
import { View, Text } from "react-native";
import StartPlanningDatePicker from "@/components/onboarding/StartPlanningDatePicker";
import tw from "twrnc";

export default function StartPlanningDateTimeView() {
  const onboardingStore = useOnboardingStore();

  const startTime = onboardingStore.startTime;
  const setStartTime = onboardingStore.setStartTime;
  const endTime = onboardingStore.endTime;
  const setEndTime = onboardingStore.setEndTime;

  return (
    <View style={tw`gap-y-6 items-center`}>
      <Text
        style={tw`mt-10 text-slate-600 text-lg font-semibold w-full text-left`}
      >
        Travel Dates
      </Text>
      <StartPlanningDatePicker />
      <Text
        style={tw`mt-10 text-slate-600 text-lg font-semibold w-full text-left`}
      >
        Preferred Trip Timings
      </Text>
      <StartPlanningTimeSlider
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
    </View>
  );
}
