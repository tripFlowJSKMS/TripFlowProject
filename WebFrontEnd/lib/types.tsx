import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import HomePage from '@/app/pages/homePage';
import StartPlanningPage from '@/app/pages/startPlanningPage';
import PickLocationsPage from '@/app/pages/pickLocationsPage';

export type RootStackParamList = {
  Home: undefined;
  StartPlanning: undefined;
  PickLocations: undefined;
};

export type MessageNavProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};