import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './homePage';
import StartPlanningPage from './startPlanningPage';
import PickLocationsPage from './pickLocationsPage';
import EditLocationsPage from './editLocationsPage';
import ItineraryPage from './itineraryPage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="StartPlanning" component={StartPlanningPage} />
        <Stack.Screen name="PickLocations" component={PickLocationsPage} />
        <Stack.Screen name="EditLocations" component={EditLocationsPage} />
        <Stack.Screen name="Itinerary" component={ItineraryPage} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
