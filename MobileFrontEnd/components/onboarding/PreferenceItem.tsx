import { Preference } from "@/store/onboardingStore";
import { Text, Pressable } from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { fromTheme } from "tailwind-merge";

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
      style={tw`flex relative items-center justify-center bg-slate-800 h-32 w-32 rounded-3xl border-4 p-5 ${
        preference.selected ? "border-green-400" : ""
      }`}
      onPress={onPress}
    >
      <Text style={tw`text-lg text-slate-200 font-semibold`}>
        {preference.name}
      </Text>
      {preference.selected && (
        <AntDesign
          style={tw`absolute top-2 right-2`}
          name="check"
          size={24}
          color={tw.color("green-400")}
        />
      )}
    </Pressable>
  );
}
