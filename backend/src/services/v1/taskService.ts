import { Prisma } from '@/generated/prisma/client.js';
import { db } from '@/lib/prisma.js';

// Get all tasks assigned to a store
export async function getTasksByStore(storeId: string) {
    return db.task.findMany({
        where: {
            storeId,
        },
        include: {
            workflow: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                },
            },
        },
        orderBy: {
            dueDate: 'asc',
        },
    });
}

// Get a single task with workflow questions and answers
export async function getTaskById(taskId: string) {
    return db.task.findUnique({
        where: {
            id: taskId,
        },
        include: {
            workflow: true,
            answers: true,
        },
    });
}

// Create a task assigned to a store
export async function createTask(data: {
    workflowId: string;
    storeId: string;
    assignedTo?: string;
    dueDate: Date;
}) {
    return db.task.create({
        data: {
            workflowId: data.workflowId,
            storeId: data.storeId,
            ...(data.assignedTo !== undefined && {
                assignedTo: data.assignedTo,
            }),
            dueDate: data.dueDate,
        },
    });
}

// Save or update an answer to a workflow question
export async function saveTaskAnswer(data: {
    taskId: string;
    questionId: string;
    answer: Prisma.InputJsonValue;
}) {
    return db.taskAnswer.upsert({
        where: {
            taskId_questionId: {
                taskId: data.taskId,
                questionId: data.questionId,
            },
        },
        create: {
            taskId: data.taskId,
            questionId: data.questionId,
            answer: data.answer,
        },
        update: {
            answer: data.answer,
        },
    });
}

// Mark a task as completed
export async function completeTask(taskId: string) {
    return db.task.update({
        where: {
            id: taskId,
        },
        data: {
            status: 'COMPLETED',
        },
    });
}
