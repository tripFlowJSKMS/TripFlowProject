// A class to represent a coordinate on the map
// Simplified intermediate representation of the 
// TripFlow Destination class
export class Coordinate {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
