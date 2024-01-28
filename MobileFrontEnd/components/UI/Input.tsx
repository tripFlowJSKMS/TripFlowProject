import { View, Text, TextInput, TextInputProps } from "react-native";
import tw from "twrnc";
import { cn } from "@/lib/utils";

interface InputProps extends TextInputProps {
  className?: string;
  label?: string;
  confirmationButton?: React.ReactNode;
}

export default function Input({
  className,
  label,
  children,
  confirmationButton,
  ...props
}: InputProps) {
  return (
    <View style={tw`w-full`}>
      {label && (
        <Text style={tw`mb-1 text-base text-slate-500 opacity-95`}>
          {label}
        </Text>
      )}
      <View style={tw`w-full flex-row`}>
        <TextInput
          {...props}
          style={tw`${cn(
            "rounded-lg px-2 py-1 border text-base flex-1 border-slate-800",
            className,
          )}`}
        >
          {children}
        </TextInput>
        {confirmationButton}
      </View>
    </View>
  );
}
