import { View, Text } from "react-native";
import tw from "twrnc";
import { Picker } from "@react-native-picker/picker";
import { cn } from "@/lib/utils";

interface SelectInputProps {
  label?: string;
  selectedValue: string;
  setValue: (value: string) => void;
  options: { name: string; value: string }[];
}

export default function SelectInput({
  label,
  selectedValue,
  setValue,
  options,
}: SelectInputProps) {
  return (
    <View style={tw`w-full`}>
      {label && <Text style={tw`text-slate-500 mb-1 opacity-95`}>{label}</Text>}
      <View style={tw`border rounded-lg`}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setValue(itemValue)}
        >
          {options.map((option) => {
            return (
              <Picker.Item
                style={tw`text-sm`}
                key={option.name}
                label={option.name}
                value={option.value}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
