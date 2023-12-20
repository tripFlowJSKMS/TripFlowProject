import tw from "twrnc";
import {Picker} from '@react-native-picker/picker';
import { createTimeIntervals } from "../../helpers/dateTimeHelpers/dateTimeFunctions";

interface TimeInputProps {
  setValue: (value: number) => void;
}

export default function TimeInput({ setValue }: TimeInputProps) {
    const timeOptions = createTimeIntervals();
    return (
      <Picker style={tw`w-5/12 rounded-lg p-2`} onValueChange={(itemValue: number) => setValue(Number(itemValue))}>
      {Object.entries(timeOptions).map(([timeString, timeInMinutes]) => (
        <Picker.Item key={timeString} label={timeString} value={timeInMinutes} />
      ))}
      </Picker>
    );
  }





