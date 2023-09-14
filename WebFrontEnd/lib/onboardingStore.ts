// import { create } from "zustand";
// import { 
//   type AreasOfInterestType,
// } from "shared/types";

// export interface Preference {
//   name: AreasOfInterestType;
//   selected: boolean;
// }

// const togglePreference = (preferences: Preference[], name: AreasOfInterestType) => {
//   return preferences.map((preference) => ({
//     ...preference,
//     selected:
//       preference.name === name ? !preference.selected : preference.selected,
//   }));
// };

// interface OnboardingStore {
//   preferences: Preference[];
//   startTime: number;
//   endTime: number;
//   setStartTime: (time: number) => void;
//   setEndTime: (time: number) => void;
//   togglePreference: (name: AreasOfInterestType) => void;
// }

// const generateInitialPreferences = () => {
//   const allPreferenceValues: PreferenceType[] = [
//     "Sports",
//     "Music",
//     "Outdoors",
//     "Food",
//     "Art",
//     "Shopping",
//   ];

//   return allPreferenceValues.map((preference) => ({
//     name: preference,
//     selected: false,
//   }));
// };

// const useOnboardingStore = create<OnboardingStore>((set) => {

//   const preferences: Preference[] = generateInitialPreferences();
//   return {
//     preferences,
//     startTime: 600, // 10am to 10pm
//     endTime: 1320,
//     setStartTime: (time: number) => {
//       set((state) => ({
//         ...state,
//         startTime: time,
//       }));
//     },
//     setEndTime: (time: number) => {
//       set((state) => ({
//         ...state,
//         endTime: time,
//       }));
//     },
//     togglePreference: (name: AreasOfInterestType) => {
//       set((state) => ({
//         ...state,
//         preferences: togglePreference(state.preferences, name),
//       }));
//     },
//   } 
// });

// export default useOnboardingStore;
