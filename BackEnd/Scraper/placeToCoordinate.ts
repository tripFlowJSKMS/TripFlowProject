import { Client } from "@googlemaps/google-maps-services-js";

import { Coordinate } from "./Coordinate";

// Google Maps API key
const my_key = process.env.GOOGLE_MAPS_API_KEY!;

// Google Maps API client
const client = new Client({});

// Obtain the best coordinate from the Google Maps API
export async function placeToCoordinate(place: string, currentCoordinate: Coordinate): Promise<Coordinate> {
  return await getBestCoordinates(place, currentCoordinate);
}

// All helper functions are listed below

// Obtain a set of possible coordinates from the Google Maps API
async function getPotentialCoordinates(place: string): Promise<Coordinate[]> {
  // Make the request
  let response = await client.geocode({
    params: {
      address: place,
      key: my_key,
    },
    timeout: 1000, // milliseconds
  });

  // Extract coordinates from response
  return response.data.results.map((result) => 
    new Coordinate(
      result.geometry.location.lat,
      result.geometry.location.lng
    )
  );
}

// Given a place, and an approximate coordinate (most likely your location), 
// obtain the best coordinate from the Google Maps API
// This at least filters out coordinates that are not in the same country as you
async function getBestCoordinates(place: string, currentCoordinate: Coordinate): Promise<Coordinate> {
  // Auxiliary function to calculate distance between two coordinates
  function getDistance(coordinate1: Coordinate, coordinate2: Coordinate): number {
    return Math.sqrt(Math.pow(coordinate1.lat - coordinate2.lat, 2) + Math.pow(coordinate1.lng - coordinate2.lng, 2));
  }
  // Obtain all possible coordinates
  let coordinates: Coordinate[] = await getPotentialCoordinates(place);
  // It's a problem if there are no coordinates
  if (coordinates.length === 0) {
    throw new Error("No coordinates found");
  }
  // Otherwise, return the closest coordinate
  let bestCoordinate: Coordinate = coordinates[0];
  let bestDistance: number = getDistance(currentCoordinate, bestCoordinate);
  for (let i = 1; i < coordinates.length; i++) {
    let distance = getDistance(currentCoordinate, coordinates[i]);
    if (distance < bestDistance) {
      bestCoordinate = coordinates[i];
      bestDistance = distance;
    }
  }
  return bestCoordinate;
}