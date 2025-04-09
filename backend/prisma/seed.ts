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

    // Create new collection with proper schema
    await prisma.$runCommandRaw({
      create: "Project",
    });

    const statuses: Array<"failed" | "success" | "upcoming"> = [
      "failed",
      "success",
      "upcoming",
    ];

    const TOTAL_PROJECTS = 100;

    // Generate all projects with proper date handling
    const projects = Array.from({ length: TOTAL_PROJECTS }, () => {
      const now = new Date();
      const pastDate = faker.date.past();

      return {
        title: faker.company.catchPhrase(),
        description: faker.lorem.paragraph(),
        status: statuses[Math.floor(Math.random() * statuses.length)],
        image: faker.image.url(),
        video: "https://example.com",
        article: "https://example.com",
        createdAt: {
          $date: pastDate.toISOString(),
        },
        updatedAt: {
          $date: faker.date.between({ from: pastDate, to: now }).toISOString(),
        },
      };
    });

    // Insert documents using MongoDB's native date format
    await prisma.$runCommandRaw({
      insert: "Project",
      documents: projects,
    });

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
