import { DestinationNode } from "./DestinationNode";

export class Destination {
    private id: number;
    private name: string;
    private weight: number = 0;
    private openingTime: number;
    private closingTime: number;
    private tourDuration: number;
    private characteristics: string[];
    private longitude: number;
    private latitude: number;
    private readonly TIME_SLOT: number = 30; // We assume 30 min timeslots for our algo
    private readonly DIST_TIME_RATIO: number = 1; // We assume it takes 1 min to travel 1 km
  
    constructor(id: number, name: string, openingTime: number, 
        closingTime: number, tourDuration: number, characteristics: string[],
        longitude: number, latitude: number) {
      this.id = id;
      this.name = name;
      this.openingTime = openingTime;
      this.closingTime = closingTime;
      this.tourDuration = tourDuration;
      this.characteristics = characteristics;
      this.longitude = longitude;
      this.latitude = latitude;
    }

    getLongitude(): number {
      return this.longitude;
    }

    getLatitude(): number {
      return this.latitude;
    }
  
    getWeight(): number {
      return this.weight;
    }
  
    setWeight(preferences: string[]): void {  
      let matchCount: number = 0;
      for (const preference of preferences) {
        if (this.characteristics.includes(preference)) {
          matchCount++;
        }
      }
  
      // Calculate the percentage match and store it in the weights map
      const percentageMatch: number = matchCount / preferences.length;
      this.weight = percentageMatch;
    }
  
    getCharacteristics(): string[] {
      return this.characteristics;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getOpeningTime(): number {
        return this.openingTime;
    }

    getClosingTime(): number {
        return this.closingTime;
    }

    getTourDuration(): number {
        return this.tourDuration;
    }

    calculateNumTimeSlots(): number {
      let numTimeSlots: number = (this.closingTime - this.openingTime) / this.TIME_SLOT;
      numTimeSlots -= this.tourDuration / this.TIME_SLOT; 
      return numTimeSlots
    }

    generateNode(timeslotMultiplier: number): DestinationNode {
      const startTime: number = this.openingTime + (timeslotMultiplier * this.TIME_SLOT);
      const endTime: number = startTime + this.tourDuration;
      return new DestinationNode(this, startTime, endTime);
    }

    getTravelTime(destination: Destination): number {
      const earthRadiusInKm = 6371; // Earth's radius in kilometers
    
      const sourceLatitudeRad = this.toRadians(this.latitude);
      const sourceLongitudeRad = this.toRadians(this.longitude);
      const destinationLatitudeRad = destination.toRadians(destination.latitude);
      const destinationLongitudeRad = destination.toRadians(destination.longitude);
    
      const dLatitude = destinationLatitudeRad - sourceLatitudeRad;
      const dLongitude = destinationLongitudeRad - sourceLongitudeRad;
    
      const a =
        Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
        Math.cos(sourceLatitudeRad) *
          Math.cos(destinationLatitudeRad) *
          Math.sin(dLongitude / 2) *
          Math.sin(dLongitude / 2);
    
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
      const distanceInKm = earthRadiusInKm * c;
      return Math.ceil(distanceInKm * this.DIST_TIME_RATIO);
    }
  
    toRadians(degrees: number): number {
      return (degrees * Math.PI) / 180;
    }

    isPossiblePlan(leaveSourceTime: number, reachDestinationTime: number, dayEndTime: number, destination: Destination): boolean {
      let travellingTime: number = Infinity;
      if (this.name == "Supernode") {
        // This is assumed for our MVP. We will set this as the hotel location next time
            travellingTime = 0;
      } else {
          travellingTime = this.getTravelTime(destination);
      }
      // this statement bugs out the algo because we no longer respect the 30 minute intervals
      // const totalTime = leaveSourceTime + travellingTime + tourDuration;



      return (reachDestinationTime + destination.tourDuration <= dayEndTime) &&
          (leaveSourceTime + travellingTime <= reachDestinationTime);
    }

    itineraryFormat(startTime: number, endTime: number): [Destination, number, number] {
      return [this, startTime, endTime];
    }

}
