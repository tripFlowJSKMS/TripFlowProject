import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "./components/input";
import Title from "./components/title";
import Button from "./components/button";

export default function RegistrationPage() {

  return (
    <View style={tw`flex items-center justify-center h-4/6 p-8`}>
      <Title parameter="Create your account"/>
      <Input parameter="Name" />
      <Input parameter="Prefered trip starting time" />
      <Input parameter="Prefered trip ending time" />
      <Input parameter="Interested themes" />
      <Button>
        <Text style={tw.style("text-slate-900")}>Create your account!</Text>
      </Button>
    </View>
  );
}

