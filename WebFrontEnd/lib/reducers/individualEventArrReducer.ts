import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GPTScrapedEventType } from "../../../Shared/types/callGPT";

export type IndividualEventArrState = {
  allEvents: GPTScrapedEventType[];
};

const initialState: IndividualEventArrState = {
  allEvents: [],
};

const individualEventArrSlice = createSlice({
  name: "allEvents",
  initialState,
  reducers: {
    setIndividualEventArr: (state: IndividualEventArrState, action: PayloadAction<GPTScrapedEventType[]>) => {
      state.allEvents = action.payload;
    },
  },
});

export const { setIndividualEventArr } = individualEventArrSlice.actions;
export default individualEventArrSlice.reducer;
