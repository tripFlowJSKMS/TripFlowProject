import { Link } from "expo-router";
import { Text, View } from "react-native";
import tw from "twrnc";
import RegistrationPage from "./pages/RegistrationPage";
import StartPlanningPage from "./pages/StartPlanningPage";
import { GoogleOAuthProvider } from '@react-oauth/google';

import HomePage from "./pages/HomePage";

export default function App() {

  return (
      <HomePage></HomePage>
      // <GoogleOAuthProvider clientId="371089798315-eeri85ic9lt17njh1dl1th1q92lfk2h7.apps.googleusercontent.com">
      //   <RegistrationPage></RegistrationPage>
      // </GoogleOAuthProvider>
  );
}

