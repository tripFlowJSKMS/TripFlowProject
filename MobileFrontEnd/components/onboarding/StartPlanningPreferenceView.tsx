import useOnboardingStore from "@/store/onboardingStore";
import PreferenceItem from "./PreferenceItem";
import { View, Text, ScrollView } from "react-native";
import tw from "twrnc";

export default function StartPlanningPreferenceView() {
  const { preferences, togglePreference } = useOnboardingStore();

  return (
    <>
      <Text
        style={tw`text-slate-600 mb-4 text-lg font-semibold w-full text-left`}
      >
        Area of Interest
      </Text>
      <ScrollView
        style={tw`h-full w-full`}
        contentContainerStyle={tw`flex flex-row flex-wrap items-start gap-8 justify-center`}
      >
        {preferences.map((preference) => {
          return (
            <PreferenceItem
              key={preference.name}
              preference={preference}
              onPress={() => togglePreference(preference.name)}
            />
          );
        })}
      </ScrollView>
    </>
  );
}
