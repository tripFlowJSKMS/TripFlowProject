import { create } from "zustand";
import type {
  DietaryPreferenceType,
  PreferenceType,
  ScheduleType,
} from "shared/types";

export interface Preference {
  name: PreferenceType;
  selected: boolean;
}

const togglePreference = (preferences: Preference[], name: PreferenceType) => {
  return preferences.map((preference) => ({
    ...preference,
    selected:
      preference.name === name ? !preference.selected : preference.selected,
  }));
};

interface OnboardingStore {
  preferences: Preference[];
  departureLocation: string;
  destinationLocation: string;
  pax: number;
  dietaryPreference: DietaryPreferenceType;
  pace: ScheduleType;
  startTime: number;
  endTime: number;
  startDate: Date;
  endDate: Date;
  setDepartureLocation: (location: string) => void;
  setDestinationLocation: (location: string) => void;
  setPax: (pax: number) => void;
  setDietaryPreference: (preference: DietaryPreferenceType) => void;
  setPace: (pace: ScheduleType) => void;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  togglePreference: (name: PreferenceType) => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  preferences: [
    {
      name: "Sports",
      selected: false,
    },
    {
      name: "Music",
      selected: false,
    },
    {
      name: "Outdoors",
      selected: false,
    },
    {
      name: "Food",
      selected: false,
    },
    {
      name: "Art",
      selected: false,
    },
    {
      name: "Shopping",
      selected: false,
    },
  ],
  departureLocation: "",
  destinationLocation: "",
  pax: 1,
  dietaryPreference: "Normal",
  pace: "Normal",
  startTime: 600, // 10am to 10pm
  endTime: 1320,
  startDate: new Date(),
  endDate: new Date(),
  setDepartureLocation: (location: string) => {
    set((state) => ({
      ...state,
      departureLocation: location,
    }));
  },
  setDestinationLocation: (location: string) => {
    set((state) => ({
      ...state,
      destinationLocation: location,
    }));
  },
  setPax: (pax: number) => {
    set((state) => ({
      ...state,
      pax: pax,
    }));
  },
  setDietaryPreference: (preference: DietaryPreferenceType) => {
    set((state) => ({
      ...state,
      dietaryPreference: preference,
    }));
  },
  setPace: (pace: ScheduleType) => {
    set((state) => ({
      ...state,
      pace: pace,
    }));
  },
  setStartTime: (time: number) => {
    set((state) => ({
      ...state,
      startTime: time,
    }));
  },
  setEndTime: (time: number) => {
    set((state) => ({
      ...state,
      endTime: time,
    }));
  },
  setStartDate: (date: Date) => {
    set((state) => ({
      ...state,
      startDate: date,
    }));
  },
  setEndDate: (date: Date) => {
    set((state) => ({
      ...state,
      endDate: date,
    }));
  },
  togglePreference: (name: PreferenceType) => {
    set((state) => ({
      ...state,
      preferences: togglePreference(state.preferences, name),
    }));
  },
}));

export default useOnboardingStore;
