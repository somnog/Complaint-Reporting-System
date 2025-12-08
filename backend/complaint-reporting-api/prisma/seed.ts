import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Roads", description: "Road and traffic issues" },
    { name: "Water", description: "Water supply issues" },
    { name: "Electricity", description: "Power outage and wiring issues" },
    { name: "Sanitation", description: "Garbage collection and sewage issues" },
    { name: "Public Safety", description: "Crimes, hazards, insecure areas" }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
