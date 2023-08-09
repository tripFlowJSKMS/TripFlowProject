import { View, Pressable, Text, PressableProps } from "react-native";
import tw from "twrnc";
import { cn } from "@/app/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  className?: string;
}

const buttonVariants = cva(
  "flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm",
  {
    variants: {
      variant: {
        default: "text-slate-900 bg-gray-300",
        primary: "text-white bg-transparent",
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
