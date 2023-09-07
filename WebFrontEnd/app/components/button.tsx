import { View, Pressable, Text, PressableProps } from "react-native";
import tw from "twrnc";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  className?: string;
}

const buttonVariants = cva(
  "flex items-center justify-center px-4 py-2 w-60 font-medium rounded-md shadow-sm",
  {
    variants: {
      variant: {
        default: "text-white bg-black rounded-full",
        primary: "w-30 text-slate-900 border-gray-500 bg-transparent border rounded-full",
        selected: "w-30 text-slate-900 border-gray-500 bg-gray-500 border rounded-full",
      },
      size: {
        default: "h-10",
        sm: "h-9 rounded-md",
        lg: "h-11 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export default function Button({variant, size, className, children, ...props}: ButtonProps) {
  return (
    <Pressable {...props} style={tw`${cn(buttonVariants({ variant, size, className }))}`}>
      {children}
    </Pressable>
  );
}
