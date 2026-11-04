import { db } from "../src/lib/prisma.js";

async function seedTasks() {
  try {
    // Find the workflow we previously seeded
    const workflow = await db.workflow.findUnique({
      where: {
        name: "daily_store_opening_workflow",
      },
    });

    if (!workflow) {
      throw new Error("Daily Store Opening workflow not found");
    }

    // Clear existing tasks
    await db.task.deleteMany();

    // Create demo tasks
    await db.task.createMany({
      data: [
        {
          workflowId: workflow.id,
          storeId: "store-001",
          assignedTo: "manager-001",
          dueDate: new Date(),
        },
        {
          workflowId: workflow.id,
          storeId: "store-002",
          assignedTo: "manager-002",
          dueDate: new Date(),
        },
      ],
    });

    console.log("Successfully seeded tasks");
  } catch (error) {
    console.error("Failed to seed tasks:", error);
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

seedTasks();