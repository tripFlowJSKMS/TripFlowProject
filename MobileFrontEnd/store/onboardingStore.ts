import { create } from "zustand";
import type { PreferenceType } from "shared/types";

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
  togglePreference: (name: PreferenceType) => {
    set((state) => ({
      ...state,
      preferences: togglePreference(state.preferences, name),
    }));
  },
}));

export default useOnboardingStore;
