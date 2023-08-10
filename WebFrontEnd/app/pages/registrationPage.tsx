import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";

export default function RegistrationPage() {

  return (
    <View style={tw`flex items-center justify-center h-4/6`}>
      <Title parameter="Create your account"/>
      <Input parameter="Name" width={75} />
      <Input parameter="Prefered trip starting time" width={75} />
      <Input parameter="Prefered trip ending time" width={75} />
      <Input parameter="Interested themes" width={75} />
      <Button>
        <Link href="/pages/startPlanningPage">
          <Text style={tw.style("text-slate-900")}>Create your account!</Text>
        </Link>
      </Button>
    </View>
  );
}