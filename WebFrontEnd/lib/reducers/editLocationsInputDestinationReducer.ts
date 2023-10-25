import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditLocationsInputType } from "../../../Shared/types/pickLocations";

export type EditLocationsInputDestinationState = {
  destinations: EditLocationsInputType;
};

const initialState: EditLocationsInputDestinationState = {
  destinations: [],
};

const editLocationsInputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setEditLocationsInputDestinations: (state: EditLocationsInputDestinationState, action: PayloadAction<EditLocationsInputType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setEditLocationsInputDestinations } = editLocationsInputDestinationSlice.actions;
export default editLocationsInputDestinationSlice.reducer;
