export type QuestionType = 'boolean' | 'text' | 'number';

export type WorkflowQuestion = {
    id: string;
    text: string;
    type: QuestionType;
    required: boolean;
    next: Record<string, string | null>;
};

export type Workflow = {
    version: number;
    startQuestionId: string;
    questions: WorkflowQuestion[];
};

export type WorkflowAnswers = Record<string, unknown>;
