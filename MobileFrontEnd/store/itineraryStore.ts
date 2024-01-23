import { create } from "zustand";
import type { DestinationType, ItineraryType } from "../../Shared/types";

interface ItineraryStoreType {
  destinations: DestinationType[];
  setDestinations: (destinations: DestinationType[]) => void;
  itinerary: ItineraryType;
  setItinerary: (itinerary: ItineraryType) => void;
}

const useItineraryStore = create<ItineraryStoreType>((set) => ({
  destinations: [],
  setDestinations: (destinations) => set({ destinations }),
  itinerary: [],
  setItinerary: (itinerary) => set({ itinerary }),
}));

export default useItineraryStore;
