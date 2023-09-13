import { combineReducers } from 'redux';
import destinationReducer from './destinationReducer'; // Import your individual reducers

const rootReducer = combineReducers({
  destination: destinationReducer, // Add more reducers as needed
});

export default rootReducer;
