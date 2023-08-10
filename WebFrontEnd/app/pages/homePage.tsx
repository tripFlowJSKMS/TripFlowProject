import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import Input from "../components/input";
import Title from "../components/title";
import Button from "../components/button";
import TopBar from '../components/topBar'

export default function HomePage() {
  return (
    <View style={tw`flex flex-col h-full`}>
      <TopBar />
        Homepage
    </View>
  );
}