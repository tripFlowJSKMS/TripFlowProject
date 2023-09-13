import { createSlice } from "@reduxjs/toolkit";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";

const destinationSlice = createSlice({
  name: "destination",
  initialState: {
    // jy edit this
    destinations: [] as StartPlanningOutputType[], // Initial state
  },
  reducers: {
    setDestinations: (state, action) => {
      state.destinations = action.payload;
    },
  },
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
