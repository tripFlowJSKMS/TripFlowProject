import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './homePage';
import StartPlanningPage from './startPlanningPage';
import PickLocationsPage from './pickLocationsPage';
import EditLocationsPage from './editLocationsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="StartPlanning" component={StartPlanningPage} />
        <Stack.Screen name="PickLocations" component={PickLocationsPage} />
        <Stack.Screen name="EditLocations" component={EditLocationsPage} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
