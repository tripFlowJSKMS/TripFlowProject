import { combineReducers } from 'redux';
import startPlanningOutputDestinationReducer, { StartPlanningOutputDestinationState } from './startPlanningOutputDestinationReducer';
import pickLocationsOutputDestinationReducer, { PickLocationsOutputDestinationState } from './pickLocationsOutputDestinationReducer';
import editLocationsInputDestinationReducer, { EditLocationsInputDestinationState } from './editLocationsInputDestinationReducer';
import itineraryInputDestinationReducer, { ItineraryInputDestinationState } from './itineraryInputDestinationReducer';
import editLocationsOutputDestinationReducer, { EditLocationsOutputDestinationState } from './editLocationsOutputDestinationReducer';

const rootReducer = combineReducers({
  startPlanningOutputDestination: startPlanningOutputDestinationReducer, // Add more reducers as needed
  pickLocationsOutputDestination: pickLocationsOutputDestinationReducer,
  editLocationsInputDestination: editLocationsInputDestinationReducer,
  editLocationsOutputDestination: editLocationsOutputDestinationReducer,
  itineraryInputDestination: itineraryInputDestinationReducer,
});

export type RootState = {
  startPlanningOutputDestination: StartPlanningOutputDestinationState;
  pickLocationsOutputDestination: PickLocationsOutputDestinationState;
  editLocationsInputDestination: EditLocationsInputDestinationState;
  editLocationsOutputDestination: EditLocationsOutputDestinationState;
  itineraryInputDestination: ItineraryInputDestinationState;
}

export default rootReducer;
