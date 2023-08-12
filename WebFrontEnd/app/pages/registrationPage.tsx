import { Link } from "expo-router";
import { Text, View, Image } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import { register } from "../lib/utils";
import { useState } from "react";
import ThemeButtons from "../components/themeButtons";
import TopBar from "../components/topBar";
import useOnboardingStore from "../lib/onboardingStore";

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");

  const onboardingStore = useOnboardingStore();

  return (
    <View>
      <TopBar isRegistered={false}></TopBar>

      <View style={tw`flex flex-row`}>
        <Image source={require('../assets/sand-castle-on-clearwater-beach-photo.jpg')} style={tw`w-50%`} />
        <View style={tw`flex w-50% items-center justify-center h-4/6`}>
          <Title parameter="Create Your Account"/>

          <View style={tw`w-50%`}>
            <Input parameter="Name" width={75} value={username} setValue={setUsername} />
            <Input parameter="Prefered Trip Starting Time" width={75} value={startingTime} setValue={setStartingTime} />
            <Input parameter="Prefered Trip Ending Time" width={75} value={endingTime} setValue={setEndingTime} />
          </View>

          <View style={tw`my-10 ml-20`}>
            <Text style={tw`text-base font-semibold`}>Interested Themes:</Text>
            <View style={tw`flex w-100% flex-row flex-wrap`}>
                  {onboardingStore.preferences.map((preference) => 
                    <ThemeButtons key={preference.name} preference={preference} onPress={() => onboardingStore.togglePreference(preference.name)} />)}
            </View>
          </View>

          <View>
            <Button onPress={() => register(username, Number(startingTime), Number(endingTime), onboardingStore.preferences)}>
              <Link href="/pages/startPlanningPage">
                <Text style={tw.style("text-white")}>Create your account!</Text>
              </Link>
            </Button>
          </View>

        </View>
      </View>
    </View>
  );
}