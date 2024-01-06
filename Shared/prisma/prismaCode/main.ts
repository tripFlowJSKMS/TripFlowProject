import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// run "npx primsa generate" when editing schema.prisma to reflect changes here
// run in terminal npx ts-node prisma\prismaCode\main.ts to run the file

function createInformation(name: string, preferences: string, 
  startTime: number, endTime: number) {
    const newInformation = prisma.information.create({
      data: {
        name,
        preferences,
        startTime,
        endTime,
      },
    });
  
    return newInformation;
}

export function getAllInformation() {
    const allInformation = prisma.information.findMany();
    return allInformation;
}

function createItinerary(locationName: string, openingTime: number, 
  closingTime: number, timeRequired: number, characteristics: string,
  longitude: number, latitude: number ) {
  const newInformation = prisma.itineraryMatrix.create({
    data: {
      locationName,
      openingTime,
      closingTime,
      timeRequired,
      characteristics,
      longitude,
      latitude,
    },
  });

  return newInformation;
}

export function getAllDestinations() {
  const allItinerary = prisma.itineraryMatrix.findMany();
  return allItinerary;
}

async function run() {
  const allDestinations = await getAllDestinations();
  console.log("All Destinations:");
  console.log(allDestinations);
}

// // Call the run function to print out all the output
// run().catch(error => {
//   console.error("Error occurred:", error);
// }).finally(() => {
//   // Disconnect the Prisma client when done
//   prisma.$disconnect();
// });



