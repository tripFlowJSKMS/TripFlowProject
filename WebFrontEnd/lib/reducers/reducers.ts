import { combineReducers } from 'redux';
import destinationReducer, { DestinationState } from './destinationReducer'; // Import your individual reducers

const rootReducer = combineReducers({
  destination: destinationReducer, // Add more reducers as needed
});

export type RootState = {
  destination: DestinationState;
}

export default rootReducer;
