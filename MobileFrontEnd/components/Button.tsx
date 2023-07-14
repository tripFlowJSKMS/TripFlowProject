import { View, Pressable, Text, PressableProps } from "react-native";
import tw from "twrnc";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  className?: string;
}

const buttonVariants = cva(
  "flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm",
  {
    variants: {
      variant: {
        default: "text-slate-900 bg-white",
        primary: "text-white bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export default function Button({
  variant,
  size,
  className,
  children,
}: ButtonProps) {
  return (
    <Pressable style={tw`${cn(buttonVariants({ variant, size, className }))}`}>
      {children}
    </Pressable>
  );
}
