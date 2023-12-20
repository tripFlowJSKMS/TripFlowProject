import { Text, View } from "react-native";
import tw from "twrnc";

export default function HomePageDashboard() {
    return (
        <View style={tw`flex rounded shadow-2xl bg-black w-9/12`}>
              <Text style={tw`text-white text-5xl font-bold text-center p-4`}>TripFlow</Text>
              <Text style={tw`text-white text-lg font-medium text-center p-4`}>Seamless Journey, Endless Joy</Text>
        </View>
      );
}