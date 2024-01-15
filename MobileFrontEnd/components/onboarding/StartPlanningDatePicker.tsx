import { useState } from "react";
import { Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../UI/Button";
import tw from "twrnc";
import useOnboardingStore from "@/store/onboardingStore";

export default () => {
  const { startDate, setStartDate, endDate, setEndDate } = useOnboardingStore();
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const onChangeStart = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowStart(false);
    setStartDate(currentDate);
    if (currentDate > endDate) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  const onChangeEnd = (event, selectedDate: Date) => {
    const currentDate = selectedDate;
    setShowEnd(false);
    setEndDate(currentDate);
    if (currentDate < startDate) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  };

  return (
    <>
      <View style={tw`flex flex-row gap-2 items-center justify-center`}>
        <Text style={tw`text-lg`}>Start date:</Text>
        <Button size="lg" onPress={() => setShowStart(true)}>
          <Text style={tw`text-lg`}>
            {startDate.toLocaleString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </Button>
      </View>
      {showStart && (
        <DateTimePicker
          value={startDate}
          mode="date"
          is24Hour={true}
          onChange={onChangeStart}
        />
      )}
      <View style={tw`flex flex-row gap-2 items-center justify-center`}>
        <Text style={tw`text-lg`}>End date:</Text>
        <Button size="lg" onPress={() => setShowEnd(true)}>
          <Text style={tw`text-lg`}>
            {endDate.toLocaleString("en-GB", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </Button>
      </View>
      {showEnd && (
        <DateTimePicker
          value={endDate}
          mode="date"
          is24Hour={true}
          onChange={onChangeEnd}
        />
      )}
      {showErrorMessage && (
        <Text style={tw`text-red-600 text-center`}>
          Start date cannot be after end date
        </Text>
      )}
    </>
  );
};
