import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './homePage';
import StartPlanningPage from './startPlanningPage';
import PickLocationsPage from './pickLocationsPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="StartPlanning" component={StartPlanningPage} />
        <Stack.Screen name="PickLocations" component={PickLocationsPage} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
