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

export default function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [interestedThemes, setInterestedThemes] = useState([])

  return (
    <View>
      <View style={tw`flex flex-row`}>
        <Image source={require('../assets/sand-castle-on-clearwater-beach-photo.jpg')} style={tw`w-50%`} />
        <View style={tw`flex ml-50 justify-center h-5/6`}>
          <Title parameter="Create Your Account"/>

          <View>
            <Input parameter="Name" width={75} value={username} setValue={setUsername} />
            <Input parameter="Prefered Trip Starting Time" width={75} value={startingTime} setValue={setStartingTime} />
            <Input parameter="Prefered Trip Ending Time" width={75} value={endingTime} setValue={setEndingTime} />
          </View>

          <View style={tw`my-10 w-150`}>
            <Text style={tw`text-base font-semibold`}>Interested Themes:</Text>
            <View style={tw`flex flex-row flex-wrap`}>
                <ThemeButtons parameter="Food" setValue={setInterestedThemes} />
                <ThemeButtons parameter="Family" setValue={setInterestedThemes} />
                <ThemeButtons parameter="Culture" setValue={setInterestedThemes} />
                <ThemeButtons parameter="Nature" setValue={setInterestedThemes} />
                <ThemeButtons parameter="Honeymoon" setValue={setInterestedThemes} />
                <ThemeButtons parameter="Shopping" setValue={setInterestedThemes} />
            </View>
          </View>

          <View>
            <Button onPress={() => register(username, Number(startingTime), Number(endingTime), interestedThemes)}>
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