import { Preference } from "@/store/onboardingStore";
import { Text, Pressable } from "react-native";
import tw from "twrnc";

interface PreferenceItemProps {
  preference: Preference;
  onPress: () => void;
}

export default function PreferenceItem({
  preference,
  onPress,
}: PreferenceItemProps) {
  return (
    <Pressable
      style={tw`flex items-center justify-center bg-slate-800 h-28 w-28 rounded-3xl border-4 p-5 ${
        preference.selected && "border-green-400"
      }`}
      onPress={onPress}
    >
      <Text style={tw`text-xl text-slate-200 font-semibold`}>
        {preference.name}
      </Text>
    </Pressable>
  );
}
