import Button from "@/components/Button";
import PreferenceItem from "@/components/onboarding/PreferenceItem";
import useOnboardingStore from "@/store/onboardingStore";
import { View } from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";

export default function OnboardingPage() {
  const onboardingStore = useOnboardingStore();

  const preferences = onboardingStore.preferences;
  const togglePreference = onboardingStore.togglePreference;

  return (
    <View style={tw`bg-slate-800 flex flex-col relative h-full w-full`}>
      <View
        style={tw`flex flex-row gap-10 items-center justify-center bg-slate-800 flex-1 w-full`}
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
