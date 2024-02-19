import { Text, View } from "react-native";
import tw from "twrnc";

export default function HomePageDashboard() {
    return (
        <View style={tw`bg-black rounded-3xl`}>
              <Text style={tw`text-white text-5xl font-bold text-center p-4`}>TripFlow</Text>
              <Text style={tw`text-white text-lg font-medium text-center p-4`}>Seamless Journey, Endless Joy</Text>
        </View>
      );
}