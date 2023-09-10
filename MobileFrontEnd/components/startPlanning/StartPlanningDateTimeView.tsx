import useOnboardingStore from "@/store/onboardingStore";
import StartPlanningTimeSlider from "@/components/startPlanning/StartPlanningTimeSlider";
import { View } from "react-native";
import StartPlanningDatePicker from "@/components/startPlanning/StartPlanningDatePicker";
import tw from "twrnc";

export default function StartPlanningDateTimeView() {
  const onboardingStore = useOnboardingStore();

  const startTime = onboardingStore.startTime;
  const setStartTime = onboardingStore.setStartTime;
  const endTime = onboardingStore.endTime;
  const setEndTime = onboardingStore.setEndTime;
  const startDate = onboardingStore.startDate;
  const setStartDate = onboardingStore.setStartDate;
  const endDate = onboardingStore.endDate;
  const setEndDate = onboardingStore.setEndDate;

  return (
    <View style={tw`gap-y-10`}>
      <StartPlanningDatePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <StartPlanningTimeSlider
        startTime={startTime}
        endTime={endTime}
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
    </View>
  );
}
