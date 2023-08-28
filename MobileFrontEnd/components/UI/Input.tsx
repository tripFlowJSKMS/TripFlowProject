import { TextInput, TextInputProps } from "react-native";
import tw from "twrnc";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface InputProps extends TextInputProps {
  className?: string;
}

export default function Input({ className, children, ...props }: InputProps) {
  return (
    <TextInput {...props} style={tw`${cn("rounded-lg p-2", className)}`}>
      {children}
    </TextInput>
  );
}
