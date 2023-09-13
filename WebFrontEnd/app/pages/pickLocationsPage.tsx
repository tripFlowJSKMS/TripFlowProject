import { Text, View } from "react-native";
import tw from "twrnc";
import Title from "../components/title";
import TopBar from "../components/topBar";
import DashBoard from "../components/dashBoard";
import LocationComponent from "../components/locationComponent";
import ItineraryComponent from "../components/itineraryComponent";
import { useSelector } from "react-redux";

export default function PickLocationsPage() {
  const destinationsData = useSelector((state: any) => state.destination.destinations);
  return (
    <View>
      <TopBar />

        <View style={tw`flex flex-row h-full`}>

          <View style={tw`flex w-[30%] p-10`}>
            <DashBoard></DashBoard>
          </View>
          
          <View style={tw`flex h-[100%] w-[70%] justify-center`}>
            <Title size="2" parameter="Recommended Locations"/>
            <View style={tw`flex flex-row flex-wrap`}>
            {destinationsData.map((destination) => (
              <LocationComponent
                name = {destination.name}
                characteristics = {destination.characteristics}
              />
            ))}
            </View>

            <View style={tw`p-3`}></View>
            
            <Title size="2" parameter="Itineraries to check out!"/>
            <View style={tw`flex flex-row flex-wrap`}>
              <ItineraryComponent />
              <ItineraryComponent />
              <ItineraryComponent />
            </View>
          </View>
        </View>

    </View>
  );
}