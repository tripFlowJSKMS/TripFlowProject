import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TripFlowAlgorithmType } from "../../../Shared/types/editLocations";

export type ItineraryInputDestinationState = {
  destinations: TripFlowAlgorithmType;
};

const initialState: ItineraryInputDestinationState = {
  destinations: [],
};

const itineraryInputDestinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    setItineraryInputDestinations: (state: ItineraryInputDestinationState, action: PayloadAction<TripFlowAlgorithmType>) => {
      state.destinations = action.payload;
    },
  },
});

export const { setItineraryInputDestinations } = itineraryInputDestinationSlice.actions;
export default itineraryInputDestinationSlice.reducer;
