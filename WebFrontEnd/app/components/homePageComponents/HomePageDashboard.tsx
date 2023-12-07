import { Text, View } from "react-native";
import tw from "twrnc";

export default function HomePageDashboard() {
    return (
        <View style={tw`flex rounded shadow-lg bg-black w-9/12`}>
              <Text style={tw`text-white w-50% text-5xl font-bold text-center w-full p-4`}>TripFlow</Text>
              <Text style={tw`text-white w-50% text-lg font-medium text-center w-full p-4`}>Seamless Journey, Endless Joy</Text>
        </View>
      );
}