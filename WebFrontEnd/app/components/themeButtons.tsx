import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";
import Button from "./button";

export default function ThemeButtons({ setValue, parameter }) {
    return (
      <View style={tw`my-2 mr-2`}>
        <Button variant="primary" onPress={() => {setValue(current => [...current, parameter])}}>
          <Text>{parameter}</Text>
        </Button>
      </View>
    );
  }

