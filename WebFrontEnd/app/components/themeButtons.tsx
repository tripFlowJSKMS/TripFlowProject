import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tw from "twrnc";
import Button from "./Button";

export default function ThemeButtons({ preference, onPress }) {

    return (
      <View style={tw`my-2 mr-2`}>
        <Button variant={preference.selected ? "selected" : "primary"} onPress={onPress}>
          <Text style={tw`${preference.selected ? "text-white": "text-black"}`}>{preference.name}</Text>
        </Button>
      </View>
    );
  }

