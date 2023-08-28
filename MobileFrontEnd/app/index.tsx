import Button from "@/components/UI/Button";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ImageBackground, Text, View, TextInput } from "react-native";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import Input from "@/components/UI/Input";

const placeholderImage = require("../assets/sand-castle-on-clearwater-beach-photo.jpg");

export default function Page() {
  return (
    <View style={tw`flex items-center`}>
      <View
        style={tw`flex flex-col items-center justify-start bg-slate-200 h-full w-full`}
      >
        <View
          style={tw`h-[60%] w-full flex text-center items-center justify-center`}
        >
          <ImageBackground
            source={placeholderImage}
            style={tw`h-full w-full flex items-center justify-center`}
          >
            <Text style={tw`text-xl text-center text-slate-200 font-semibold`}>
              Landing Page
            </Text>
          </ImageBackground>
        </View>
        <View style={tw`h-[40%] w-full flex items-start px-16`}>
          <View style={tw`mt-20`}>
            <Text style={tw`text-3xl text-left text-slate-800 font-semibold`}>
              Start your getaway
            </Text>
          </View>
          <View style={tw`mt-8 flex`}>
            <Text style={tw`text-sm font-medium text-left text-slate-800`}>
              Name
            </Text>
            <View style={tw`flex flex-row gap-x-4`}>
              <Input style={tw`w-52 bg-slate-400`}></Input>
              <Button variant="primary">
                <Link href="/onboardingPreferences">
                  <AntDesign name="enter" size={24} color="black" />
                </Link>
              </Button>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
