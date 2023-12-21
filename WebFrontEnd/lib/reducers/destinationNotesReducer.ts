import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DestinationType } from "../../../Shared/types";

export type DestinationNotesState = {
  destinationNotes: { [key: string]: string[] };
};

const initialState: DestinationNotesState = {
  destinationNotes: {},
};

const DestinationNotesSlice = createSlice({
  name: "destinationNotes",
  initialState,
  reducers: {
    setDestinationNotes: (
      state: DestinationNotesState,
      action: PayloadAction<Array<{ destination: DestinationType; startingTime: number; endingTime: number }>>
    ) => {
      const newDestinationNotes = action.payload.reduce((obj, { destination }) => {
        // Check if the destination already exists in state
        if (!state.destinationNotes[destination.name]) {
          obj[destination.name] = [];
        }
        return obj;
      }, { ...state.destinationNotes }); // Copy existing state to avoid mutation

      state.destinationNotes = newDestinationNotes;
    },
    updateDestinationNotes: (
      state: DestinationNotesState,
      action: PayloadAction<{ destinationName: string; note: string }>
    ) => {
      const { destinationName, note } = action.payload;
      if (state.destinationNotes[destinationName]) {
        state.destinationNotes[destinationName].push(note);
      }
    },
    deleteDestinationNotes: (
      state: DestinationNotesState,
      action: PayloadAction<{ destinationName: string; noteIndex: number }>
    ) => {
      const { destinationName, noteIndex } = action.payload;
      if (state.destinationNotes[destinationName]) {
        state.destinationNotes[destinationName].splice(noteIndex, 1);
      }
    },
  },
});

export const { setDestinationNotes, updateDestinationNotes, deleteDestinationNotes } = DestinationNotesSlice.actions;
export default DestinationNotesSlice.reducer;
