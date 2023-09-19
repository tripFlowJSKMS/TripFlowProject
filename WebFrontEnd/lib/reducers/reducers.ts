import { combineReducers } from 'redux';
import startPlanningOutputDestinationReducer, { StartPlanningOutputDestinationState } from './startPlanningOutputDestinationReducer';
import pickLocationsOutputDestinationReducer, { PickLocationsOutputDestinationState } from './pickLocationsOutputDestinationReducer';

const rootReducer = combineReducers({
  startPlanningOutputDestination: startPlanningOutputDestinationReducer, // Add more reducers as needed
  pickLocationsOutputDestination: pickLocationsOutputDestinationReducer
});

export type RootState = {
  startPlanningOutputDestination: StartPlanningOutputDestinationState;
  pickLocationsOutputDestination: PickLocationsOutputDestinationState;
}

export default rootReducer;
