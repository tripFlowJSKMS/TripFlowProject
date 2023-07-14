import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    async function createInformation(name: string, preferences: string, wakeUpTime: string, sleepTime: string) {
        const newInformation = await prisma.information.create({
          data: {
            name,
            preferences,
            wakeUpTime,
            sleepTime,
          },
        });
      
        return newInformation;
    }

    async function getAllInformation() {
        const allInformation= await prisma.information.findMany();
        return allInformation;
    }

    const createdInformation = await createInformation('John Doe', 'Shopping', '08:00', '22:00');
    console.log('Created information:', createdInformation);

    const allInformation = await getAllInformation();
    console.log('All Information:', allInformation);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
