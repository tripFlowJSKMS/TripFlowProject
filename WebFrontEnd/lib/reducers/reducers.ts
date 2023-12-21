import { combineReducers } from 'redux';
import startPlanningOutputDestinationReducer, { StartPlanningOutputDestinationState } from './startPlanningOutputDestinationReducer';
import pickLocationsOutputDestinationReducer, { PickLocationsOutputDestinationState } from './pickLocationsOutputDestinationReducer';
import editLocationsInputDestinationReducer, { EditLocationsInputDestinationState } from './editLocationsInputDestinationReducer';
import itineraryInputDestinationReducer, { ItineraryInputDestinationState } from './itineraryInputDestinationReducer';
import editLocationsOutputDestinationReducer, { EditLocationsOutputDestinationState } from './editLocationsOutputDestinationReducer';
import travellingPreferencesReducer, { TravellingPreferencesState } from './travellingPreferencesReducer';
import individualEventArrReducer, { IndividualEventArrState } from './individualEventArrReducer';
import destinationNotesReducer, { DestinationNotesState } from './destinationNotesReducer';

const rootReducer = combineReducers({
  travellingPreferences: travellingPreferencesReducer,
  startPlanningOutputDestination: startPlanningOutputDestinationReducer,
  pickLocationsOutputDestination: pickLocationsOutputDestinationReducer,
  editLocationsInputDestination: editLocationsInputDestinationReducer,
  editLocationsOutputDestination: editLocationsOutputDestinationReducer,
  itineraryInputDestination: itineraryInputDestinationReducer,
  individualEventArr: individualEventArrReducer,
  destinationNotes: destinationNotesReducer
});

export type RootState = {
  travellingPreferences: TravellingPreferencesState;
  startPlanningOutputDestination: StartPlanningOutputDestinationState;
  pickLocationsOutputDestination: PickLocationsOutputDestinationState;
  editLocationsInputDestination: EditLocationsInputDestinationState;
  editLocationsOutputDestination: EditLocationsOutputDestinationState;
  itineraryInputDestination: ItineraryInputDestinationState;
  individualEventArr: IndividualEventArrState;
  destinationNotes: DestinationNotesState;
}

export default rootReducer;
