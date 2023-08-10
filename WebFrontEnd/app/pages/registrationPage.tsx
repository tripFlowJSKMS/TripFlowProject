import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import { register } from "../lib/utils";
import { useState } from "react";

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [startingTime, setStartingTime] = useState<Number>(0);
  const [endingTime, setEndingTime] = useState<Number>(0);
  const [interestedThemes, setInterestedThemes] = useState("")

  return (
    <View style={tw`flex items-center justify-center h-4/6`}>
      <Title parameter="Create your account"/>
      <Input parameter="Name" width={75} value={username} setValue={setUsername} />
      <Input parameter="Prefered trip starting time" width={75} value={startingTime} setValue={setStartingTime} />
      <Input parameter="Prefered trip ending time" width={75} value={endingTime} setValue={setEndingTime} />
      <Input parameter="Interested themes" width={75} value={interestedThemes} setValue={setInterestedThemes} />
      <Button onPress={() => register(username, startingTime, endingTime)}>
        <Link href="/pages/startPlanningPage">
          <Text style={tw.style("text-slate-900")}>Create your account!</Text>
        </Link>
      </Button>
    </View>
  );
}