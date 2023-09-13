import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/reducers'; // Import your root reducer

const store = configureStore({
  reducer: rootReducer,
  // Other store configuration options if needed
});

export default store;
