import type { Task } from '@/types/task';

const API_URL = 'http://localhost:3000/api/v1';

export async function getTasksByStore(storeId: string): Promise<Task[]> {
    const response = await fetch(
        `${API_URL}/tasks?storeId=${encodeURIComponent(storeId)}`,
    );

    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }

    const result: { data: Task[] } = await response.json();

    return result.data;
}

export async function getTaskById(taskId: string): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch task');
    }

    const result: { data: Task } = await response.json();

    return result.data;
}

export async function saveTaskAnswer(
    taskId: string,
    data: { questionId: string; answer: unknown },
) {
    const response = await fetch(`${API_URL}/tasks/${taskId}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Failed to save answer');
    }

    return response.json();
}

export async function completeTask(taskId: string) {
    const response = await fetch(`${API_URL}/tasks/${taskId}/complete`, {
        method: 'PATCH',
    });

    if (!response.ok) {
        throw new Error('Failed to complete task');
    }

    return response.json();
}
