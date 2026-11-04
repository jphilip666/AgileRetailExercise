import { z } from "zod";

// Route params
export const taskIdSchema = z.object({
  id: z.string().uuid("Invalid task ID"),
});

// Query params
export const getTasksQuerySchema = z.object({
  storeId: z.string().min(1, "Store ID is required"),
});

// Create task
export const createTaskSchema = z.object({
  workflowId: z.string().uuid(),
  storeId: z.string().min(1),
  assignedTo: z.string().optional(),
  dueDate: z.coerce.date(),
});

// Submit answer
export const saveTaskAnswerSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
  answer: z.unknown(),
});

export const storeSchema = z.object({
  storeId: z.string().min(1, "Please select a store"),
});
