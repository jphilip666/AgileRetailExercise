import type { Request, Response, NextFunction } from 'express';

import * as taskService from '@/services/v1/taskService.js';

// GET /api/tasks?storeId=store-001
export async function getTasksByStore(req: Request, res: Response, next: NextFunction) {
    try {
        const { storeId } = req.query;

        const tasks = await taskService.getTasksByStore(storeId as string);

        res.status(200).json({
            data: tasks,
        });
    } catch (error) {
        next(error);
    }
}

// GET /api/tasks/:id
export async function getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const task = await taskService.getTaskById(id as string);

        if (!task) {
            res.status(404).json({
                message: 'Task not found',
            });
            return;
        }

        res.status(200).json({
            data: task,
        });
    } catch (error) {
        next(error);
    }
}

// POST /api/tasks
export async function createTask(req: Request, res: Response, next: NextFunction) {
    try {
        const task = await taskService.createTask(req.body);

        res.status(201).json({
            message: 'Task created successfully',
            data: task,
        });
    } catch (error) {
        next(error);
    }
}

// POST /api/tasks/:id/answers
export async function saveTaskAnswer(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { questionId, answer } = req.body;

        const taskAnswer = await taskService.saveTaskAnswer({
            taskId: id as string,
            questionId,
            answer,
        });

        res.status(200).json({
            message: 'Answer saved successfully',
            data: taskAnswer,
        });
    } catch (error) {
        next(error);
    }
}

// PATCH /api/tasks/:id/complete
export async function completeTask(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const task = await taskService.completeTask(id as string);

        res.status(200).json({
            message: 'Task completed successfully',
            data: task,
        });
    } catch (error) {
        next(error);
    }
}
