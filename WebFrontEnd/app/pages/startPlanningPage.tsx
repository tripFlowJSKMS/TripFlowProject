import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";

export default function StartPlanningPage() {

    return (
      <View style={tw`flex items-center justify-center h-4/6 p-8`}>
        <Title parameter="Your next ideal trip"/>
        <View style={tw`flex-row justify-between p-3`}>
          <Input parameter="Departure" width={25} />
          <View style={tw`w-20`}></View>
          <Input parameter="Destination" width={25} />
        </View>
        <Input parameter="Pace" width={15} />
        <View style={tw`p-2`}></View>
        <Button>
          <Link href="/pages/registrationPage">
            <Text style={tw.style("text-slate-900")}>Start planning!</Text>
          </Link>
        </Button>
      </View>
    );
  }