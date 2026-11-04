import type { Workflow } from './workflow';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type Task = {
    id: string;
    storeId: string;
    workflowId: string;
    dueDate: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
    workflow: {
        id: string;
        name: string;
        description: string | null;
        rules: Workflow;
    };
    answers: {
        questionId: string;
        answer: unknown;
    }[];
};
