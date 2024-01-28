import { Destination } from "../Algorithm/Destination";

// As originally agreed, we call it a scraper, but in actuality it is a wrapper for the Google Maps API.
// It obtains interesting places from the Google Maps API, and generates new Destinations 
// from them - primarily based on opening times or a set of characteristics given by the user. 
export interface Scraper {
  
  proximity: number; // How far away from the current location should we look for destinations? In kilometers.

  // Given a node, generate nearby destinations that are open at the given time range.
  getNearbyOpenDestinations(currentLocation: Destination, openingTime: number, closingTime: number): Destination[];

  // Given a node, generate nearby destinations that have given interesting characteristics.
  getNearbyInterestingDestinations(currentLocation: Destination, characteristics: string[]): Destination[];

  // Given a node, generate nearby destinations that are open at the 
  // given time range and have given interesting characteristics.
  // I'm not sure about this one since it may yield too few results,
  // to be tested.
  getNearbyOpenInterestingDestinations(currentLocation: Destination, openingTime: number, closingTime: number, characteristics: string[]): Destination[];
}