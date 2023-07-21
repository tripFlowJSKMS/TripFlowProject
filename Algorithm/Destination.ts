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
  
    setWeight(weight: number): void {
      this.weight = weight;
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

}
