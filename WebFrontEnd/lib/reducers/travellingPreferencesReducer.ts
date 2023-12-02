import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GenerateDesirableDestinationsType } from "../../../Shared/types/startPlanning";

export type TravellingPreferencesState = {
    travellingPreferences: GenerateDesirableDestinationsType
};

const initialState: TravellingPreferencesState = {
    travellingPreferences: null
};

const travellingPreferencesSlice = createSlice({
  name: "travellingPreferences",
  initialState,
  reducers: {
    setTravellingPreferences: (state: TravellingPreferencesState, action: PayloadAction<GenerateDesirableDestinationsType>) => {
      state.travellingPreferences = action.payload;
    },
  },
});

export const { setTravellingPreferences } = travellingPreferencesSlice.actions;
export default travellingPreferencesSlice.reducer;
