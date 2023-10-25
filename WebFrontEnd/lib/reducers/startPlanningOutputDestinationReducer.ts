import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StartPlanningOutputType } from "../../../Shared/types/startPlanning";

export type StartPlanningOutputDestinationState = {
  destinations: StartPlanningOutputType;
};

const initialState: StartPlanningOutputDestinationState = {
  destinations: [],
};

const startPlanningOutputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setStartPlanningOutputDestinations: (state: StartPlanningOutputDestinationState, action: PayloadAction<StartPlanningOutputType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setStartPlanningOutputDestinations } = startPlanningOutputDestinationSlice.actions;
export default startPlanningOutputDestinationSlice.reducer;
