import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PickLocationsOutputType } from "../../../Shared/types/pickLocations";

export type PickLocationsOutputDestinationState = {
  destinations: PickLocationsOutputType;
};

const initialState: PickLocationsOutputDestinationState = {
  destinations: [],
};

const pickLocationsOutputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setPickLocationsOutputDestinations: (state: PickLocationsOutputDestinationState, action: PayloadAction<PickLocationsOutputType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setPickLocationsOutputDestinations } = pickLocationsOutputDestinationSlice.actions;
export default pickLocationsOutputDestinationSlice.reducer;
