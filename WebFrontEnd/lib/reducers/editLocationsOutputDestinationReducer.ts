import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditLocationsOutputType } from "../../../Shared/types/editLocations";

export type EditLocationsOutputDestinationState = {
  destinations: EditLocationsOutputType;
};

const initialState: EditLocationsOutputDestinationState = {
  destinations: [],
};

const editLocationsOutputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setEditLocationsOutputDestinations: (state: EditLocationsOutputDestinationState, action: PayloadAction<EditLocationsOutputType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setEditLocationsOutputDestinations } = editLocationsOutputDestinationSlice.actions;
export default editLocationsOutputDestinationSlice.reducer;
