import { db } from "../src/lib/prisma.js";
import { seedWorkflows } from "./seed-workflows.js";
import { seedTasks } from "./seed-tasks.js";

async function cleanInit() {
  console.log("Starting clean demo initialisation...");

  try {
    // Delete existing data in dependency order
    console.log("Deleting task answers...");
    await db.taskAnswer.deleteMany();

    console.log("Deleting tasks...");
    await db.task.deleteMany();

    console.log("Deleting workflows...");
    await db.workflow.deleteMany();

    // Recreate demo data
    console.log("Seeding workflows...");
    await seedWorkflows();

    console.log("Seeding tasks...");
    await seedTasks();

    console.log("Demo database initialised successfully!");
  } catch (error) {
    console.error("Failed to initialise demo database:", error);
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

cleanInit();