import { View, Text } from "react-native";
import tw from "twrnc";
import Button from "@/components/UI/Button";
import { Link } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import useOnboardingStore from "@/store/onboardingStore";

export default function StartPlanningFileUploadView() {
  const { file, setFile } = useOnboardingStore();

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  return (
    <View style={tw`items-center justify-center gap-y-16`}>
      <Button
        onPress={async () => await pickDocument()}
        className="rounded-lg w-full p-4"
      >
        <Text style={tw`text-lg text-slate-900`}>
          {file?.name ?? "Select file"}
        </Text>
      </Button>
      <Link href="/itineraryPlanning" asChild>
        <Button className="rounded-full h-48 w-48">
          <Text style={tw`text-2xl font-medium`}>Let's go!</Text>
        </Button>
      </Link>
    </View>
  );
}
