import { createSlice } from '@reduxjs/toolkit';
import { GenerateDesirableDestinationsType } from '../../../Shared/types';

const destinationSlice = createSlice({
  name: 'destination',
  initialState: {
    destinations: [] as GenerateDesirableDestinationsType[], // Initial state
  },
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
  },
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
