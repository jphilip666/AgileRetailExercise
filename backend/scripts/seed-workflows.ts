
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { db } from "../src/lib/prisma.js";
import { Prisma } from "../src/generated/prisma/client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workflowsDirectory = path.resolve(__dirname, "../workflows");

async function seedWorkflows() {
  try {
    // 1. Read all JSON filenames
    const files = await readdir(workflowsDirectory);

    const jsonFiles = files.filter((file) =>
      file.endsWith(".json")
    );

    console.log(`Found ${jsonFiles.length} workflow files`);

    // 2. Read and parse each workflow
    const workflows = await Promise.all(
      jsonFiles.map(async (file) => {
        const filePath = path.join(workflowsDirectory, file);
        const content = await readFile(filePath, "utf-8");

        const rules: Prisma.InputJsonValue =
          JSON.parse(content);

        // Use filename as workflow name
        const name = path.basename(file, ".json");

        return {
          name,
          rules,
        };
      })
    );

    // 3. Empty existing workflow table and insert new records
    await db.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.workflow.deleteMany();

      await tx.workflow.createMany({
        data: workflows,
      });
    });

    console.log(`Successfully seeded ${workflows.length} workflows`);
  } catch (error) {
    console.error("Failed to seed workflows:", error);
    process.exitCode = 1;
  } finally {
    await db.$disconnect();
  }
}

seedWorkflows();
