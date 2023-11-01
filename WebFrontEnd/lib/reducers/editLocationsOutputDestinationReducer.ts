import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DestinationType } from "../../../Shared/types";

export type EditLocationsOutputDestinationState = {
  destinations: DestinationType[];
};

const initialState: EditLocationsOutputDestinationState = {
  destinations: [],
};

const editLocationsOutputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setEditLocationsOutputDestinations: (state: EditLocationsOutputDestinationState, action: PayloadAction<DestinationType[]>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setEditLocationsOutputDestinations } = editLocationsOutputDestinationSlice.actions;
export default editLocationsOutputDestinationSlice.reducer;
