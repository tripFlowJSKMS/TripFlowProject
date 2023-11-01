import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DestinationType } from "../../../Shared/types";

export type ItineraryInputDestinationState = {
  itinerary: Array<{ destination: DestinationType; startingTime: number; endingTime: number }>;
};

const initialState: ItineraryInputDestinationState = {
  itinerary: [],
};

const itineraryInputDestinationSlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setItineraryInputDestinations: (state: ItineraryInputDestinationState, action: PayloadAction<Array<{ destination: DestinationType; startingTime: number; endingTime: number }>>) => {
      state.itinerary = action.payload;
    },
  },
});

export const { setItineraryInputDestinations } = itineraryInputDestinationSlice.actions;
export default itineraryInputDestinationSlice.reducer;
