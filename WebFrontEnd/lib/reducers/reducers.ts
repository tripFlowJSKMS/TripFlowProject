import { combineReducers } from 'redux';
import startPlanningOutputDestinationReducer, { StartPlanningOutputDestinationState } from './startPlanningOutputDestinationReducer';
import pickLocationsOutputDestinationReducer, { PickLocationsOutputDestinationState } from './pickLocationsOutputDestinationReducer';
import editLocationsInputDestinationReducer, { EditLocationsInputDestinationState } from './editLocationsInputDestinationReducer';

const rootReducer = combineReducers({
  startPlanningOutputDestination: startPlanningOutputDestinationReducer, // Add more reducers as needed
  pickLocationsOutputDestination: pickLocationsOutputDestinationReducer,
  editLocationsInputDestination: editLocationsInputDestinationReducer,
});

export type RootState = {
  startPlanningOutputDestination: StartPlanningOutputDestinationState;
  pickLocationsOutputDestination: PickLocationsOutputDestinationState;
  editLocationsInputDestination: EditLocationsInputDestinationState;
}

export default rootReducer;
