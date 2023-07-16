class Destination {
    private id: number;
    private name: string;
    private weight: number;
    private openingTime: number;
    private closingTime: number;
    private tourDuration: number;
    private characteristics: string[];

  
    constructor(id: number, name: string, openingTime: number, 
        closingTime: number, tourDuration: number, characteristics: string[]) {
      this.id = id;
      this.name = name;
      this.openingTime = openingTime;
      this.closingTime = closingTime;
      this.tourDuration = tourDuration;
      this.characteristics = characteristics;
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
