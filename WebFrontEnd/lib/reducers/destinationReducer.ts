import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";

export type DestinationState = {
  destinations: StartPlanningOutputType;
};

const initialState: DestinationState = {
  destinations: [],
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setDestinations: (state: DestinationState, action: PayloadAction<StartPlanningOutputType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setDestinations } = destinationSlice.actions;
export default destinationSlice.reducer;
