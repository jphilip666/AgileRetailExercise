import { Router } from 'express';
import * as taskController from '@/controllers/v1/taskController.js';
import { validateRequest } from '@/middleware/validateRequest.js';
import {
    taskIdSchema,
    getTasksQuerySchema,
    createTaskSchema,
    saveTaskAnswerSchema,
} from '@myapp/schemas';

const router = Router();

// GET /api/tasks?storeId=store-001
// Get all tasks for a store
router.get('/', validateRequest(getTasksQuerySchema, 'query'), taskController.getTasksByStore);

// GET /api/tasks/:id
// Get a single task, including its workflow and saved answers
router.get('/:id', validateRequest(taskIdSchema, 'params'), taskController.getTaskById);

// POST /api/tasks
// Create a new task
router.post('/', validateRequest(createTaskSchema, 'body'), taskController.createTask);

// POST /api/tasks/:id/answers
// Save or update an answer for a task
router.post(
    '/:id/answers',
    validateRequest(taskIdSchema, 'params'),
    validateRequest(saveTaskAnswerSchema, 'body'),
    taskController.saveTaskAnswer,
);

// PATCH /api/tasks/:id/complete
// Mark a task as completed
router.patch('/:id/complete', validateRequest(taskIdSchema, 'params'), taskController.completeTask);

export default router;
