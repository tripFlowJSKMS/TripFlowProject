import Button from "@/components/Button";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import tw from "twrnc";

export default function Page() {
  return (
    <View style={tw`flex items-center`}>
      <View
        style={tw`flex items-center justify-center gap-y-28 bg-slate-800 h-full w-full`}
      >
        <Text style={tw`text-xl text-slate-200 font-semibold`}>
          Landing Page
        </Text>
        <Button>
          <Link href="/onboardingPreferences">
            <Text style={tw.style("text-slate-900")}>Start planning</Text>
          </Link>
        </Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
