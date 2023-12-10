import { View } from "react-native";
import tw from "twrnc";
import {Picker} from '@react-native-picker/picker';

interface TimeInputProps {
  value: string;
  setValue: (value: string) => void;
}

export default function TimeInput({ value, setValue }: TimeInputProps) {
    // Create an array of time options in a 30-minute interval
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeOptions.push(timeString);
      }
    }

    return (
      <View style={tw`w-5/12`}>
        <Picker selectedValue={value} onValueChange={(itemValue) => setValue(itemValue)} style={tw`w-100% h-10 border border-black rounded-lg p-2`}>
          {timeOptions.map((time, index) => (
            <Picker.Item key={index} label={time} value={time} />
          ))}
        </Picker>
      </View>
    );
  }





