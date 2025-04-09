import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  try {
    // Drop collection using raw command
    await prisma
      .$runCommandRaw({
        drop: "Project",
      })
      .catch(() => {
        console.log("Collection might not exist yet, continuing...");
      });

    const statuses: Array<"failed" | "success" | "upcoming"> = [
      "failed",
      "success",
      "upcoming",
    ];

    const TOTAL_PROJECTS = 100;

    // Generate all projects
    const projects = Array.from({ length: TOTAL_PROJECTS }, () => {
      const createdAt = faker.date.past();
      return {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        image: faker.image.url(),
        video: "https://example.com",
        article: "https://example.com",
        createdAt: createdAt,
        updatedAt: faker.date.between({ from: createdAt, to: Date.now() }),
      };
    });

    // Insert all documents using insertMany command
    await prisma.$runCommandRaw({
      insert: "Project",
      documents: projects,
    });

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
