import Button from "@/components/Button";
import PreferenceItem from "@/components/onboarding/PreferenceItem";
import useOnboardingStore from "@/store/onboardingStore";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";

export default function OnboardingPage() {
  const onboardingStore = useOnboardingStore();

  const preferences = onboardingStore.preferences;
  const togglePreference = onboardingStore.togglePreference;

  return (
    <View style={tw`bg-slate-800 relative h-full w-full`}>
      <Text style={tw`mt-20 text-slate-200 text-center text-3xl font-medium`}>
        Select Preferences
      </Text>
      <View
        style={tw`mt-10 flex flex-row flex-wrap items-start gap-10 justify-center bg-slate-800 w-full`}
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
      </View>
      <View style={tw`absolute bottom-5 right-5`}>
        <Button>
          <Entypo name="chevron-right" size={24} color="black" />
        </Button>
      </View>
    </View>
  );
}
