import { Pressable, View } from "react-native";
import tw from "twrnc";
import { Text } from "react-native";
import Input from "@/components/UI/Input";
import { dietaryPreferenceOptions } from "@/lib/content";
import SelectInput from "@/components/UI/SelectInput";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useOnboardingStore from "@/store/onboardingStore";

const MAX_PAX = 9;

export default function StartPlanningDepartureView() {
  const {
    departureLocation,
    setDepartureLocation,
    destinationLocation,
    setDestinationLocation,
    pax,
    setPax,
    dietaryPreference,
    setDietaryPreference,
    pace,
    setPace,
  } = useOnboardingStore();

  return (
    <>
      <View style={tw`w-full gap-y-4`}>
        <Input
          value={departureLocation}
          onChangeText={(location) => setDepartureLocation(location)}
          label="Departure"
          placeholder="Malaysia, Kuala Lumpur"
          className=""
        />
        <Input
          value={destinationLocation}
          onChangeText={(location) => setDestinationLocation(location)}
          label="Destination"
          placeholder="Singapore"
        />
        <View style={tw`w-full flex-row gap-x-4`}>
          <View>
            <Text style={tw`text-slate-500 text-base opacity-95 mb-1`}>
              Pax
            </Text>
            <View
              style={tw`bg-slate-800 rounded-xl flex flex-row gap-x-2 py-2 px-3`}
            >
              <Pressable
                onPress={() => {
                  if (pax > 1) setPax(pax - 1);
                }}
                style={tw`w-4 justify-center`}
              >
                <Text style={tw`text-4xl text-slate-200`}>-</Text>
              </Pressable>
              <View
                style={tw`bg-slate-200 items-center rounded-md justify-center`}
              >
                <Text style={tw`text-xl px-4 font-semibold`}>{pax}</Text>
              </View>
              <Pressable
                onPress={() => {
                  if (pax < MAX_PAX) setPax(pax + 1);
                }}
                style={tw`w-4`}
              >
                <Text style={tw`text-3xl text-slate-200`}>+</Text>
              </Pressable>
            </View>
            {/* <Input value={pax.toString()} onChangeText={(value) => {
              const paxNumber = parseInt(value);
            }} label="Pax" placeholder="2" /> */}
          </View>
          <View style={tw`flex-grow`}>
            <SelectInput
              label="Dietary Preference"
              options={dietaryPreferenceOptions}
              selectedValue={dietaryPreference}
              setValue={setDietaryPreference}
            />
          </View>
        </View>
        <View>
          <Text style={tw`text-slate-500 opacity-95 mb-1`}>Pace</Text>
          <View style={tw`flex-row items-center gap-x-2`}>
            <Pressable onPress={() => setPace("Relaxed")}>
              <FontAwesome5
                color={
                  pace == "Relaxed"
                    ? tw.color("green-500")
                    : tw.color("slate-800")
                }
                name={"walking"}
                size={40}
              />
            </Pressable>
            <View style={tw`h-1 flex-1 rounded-lg bg-slate-800`} />
            <Pressable onPress={() => setPace("Normal")}>
              <FontAwesome5
                color={
                  pace == "Normal"
                    ? tw.color("green-500")
                    : tw.color("slate-800")
                }
                name={"running"}
                size={40}
              />
            </Pressable>
            <View style={tw`h-1 flex-1 rounded-lg bg-slate-800`} />
            <Pressable onPress={() => setPace("Packed")}>
              <MaterialCommunityIcons
                color={
                  pace == "Packed"
                    ? tw.color("green-500")
                    : tw.color("slate-800")
                }
                name={"run-fast"}
                size={45}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}
