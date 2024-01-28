import { Destination } from "../Algorithm/Destination";

import { Scraper } from "./Scraper";

export class ScraperManager implements Scraper {
  proximity: number = 50;

  constructor(proximity: number) {
    this.proximity = proximity;
  }

  getNearbyOpenDestinations(currentLocation: Destination, openingTime: number, closingTime: number): Destination[] {
    return [
      new Destination(
        1,
        "Test Destination",
        openingTime,
        closingTime,
        2,
        ["test"],
        ["test"],
        0,
        0,
        false
      ),
    ];
  }

  getNearbyInterestingDestinations(currentLocation: Destination, characteristics: string[]): Destination[] {
    return [
      new Destination(
        1,
        "Test Destination",
        0, 
        24,
        2,
        ["test"],
        ["test"],
        0,
        0,
        false
      ),
    ];
  }

  getNearbyOpenInterestingDestinations(currentLocation: Destination, openingTime: number, closingTime: number, characteristics: string[]): Destination[] {
    return [
      new Destination(
        1,
        "Test Destination",
        openingTime,
        closingTime,
        2,
        ["test"],
        ["test"],
        0,
        0,
        false
      ),
    ];
  }
}