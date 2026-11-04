import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Field, FieldLabel, FieldError } from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type {
    Workflow,
    WorkflowQuestion,
    WorkflowAnswers,
} from '@/types/workflow';

type WorkflowFormProps = {
    workflow: Workflow;
    initialAnswers?: WorkflowAnswers;
    onComplete: (answers: WorkflowAnswers) => void;
    onAnswer: (questionId: string, answer: unknown) => Promise<unknown>;
};

export function WorkflowForm({
    workflow,
    initialAnswers = {},
    onAnswer,
    onComplete,
}: WorkflowFormProps) {
    const [currentQuestionId, setCurrentQuestionId] = useState(
        workflow.startQuestionId,
    );

    const [completedQuestionIds, setCompletedQuestionIds] = useState<string[]>(
        [],
    );

    const form = useForm<WorkflowAnswers>({
        defaultValues: initialAnswers,
    });

    const currentQuestion = workflow.questions.find(
        (question) => question.id === currentQuestionId,
    );

    if (!currentQuestion) {
        return <p>Workflow question not found.</p>;
    }

    const getNextQuestionId = (
        question: WorkflowQuestion,
        answer: unknown,
    ): string | null => {
        let answerKey: string;

        if (typeof answer === 'boolean') {
            answerKey = answer ? 'yes' : 'no';
        } else {
            answerKey = 'any';
        }

        return question.next[answerKey] ?? null;
    };

    const handleNext = async () => {
        const isValid = await form.trigger(currentQuestion.id);

        if (!isValid) return;

        const answer = form.getValues(currentQuestion.id);

        if (
            currentQuestion.required &&
            (answer === undefined || answer === null || answer === '')
        ) {
            form.setError(currentQuestion.id, {
                type: 'required',
                message: 'This question is required',
            });
            return;
        }

        try {
            // Save the current answer before moving forward
            await onAnswer(currentQuestion.id, answer);

            // Determine the next question
            const nextQuestionId = getNextQuestionId(currentQuestion, answer);

            setCompletedQuestionIds((previous) =>
                previous.includes(currentQuestion.id)
                    ? previous
                    : [...previous, currentQuestion.id],
            );

            if (nextQuestionId === null) {
                await onComplete(form.getValues());
                return;
            }

            setCurrentQuestionId(nextQuestionId);
        } catch (error) {
            console.error('Failed to save answer or complete task:', error);
        }
    };

    const renderQuestion = () => {
        switch (currentQuestion.type) {
            case 'boolean':
                return (
                    <Controller
                        name={currentQuestion.id}
                        control={form.control}
                        rules={{
                            validate: (value) => {
                                if (!currentQuestion.required) return true;

                                return (
                                    typeof value === 'boolean' ||
                                    'Please select an answer'
                                );
                            },
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>{currentQuestion.text}</FieldLabel>

                                <RadioGroup
                                    value={
                                        field.value === undefined
                                            ? ''
                                            : String(field.value)
                                    }
                                    onValueChange={(value) =>
                                        field.onChange(value === 'true')
                                    }
                                    className="flex gap-6"
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value="true"
                                            id={`${currentQuestion.id}-yes`}
                                        />
                                        <FieldLabel
                                            htmlFor={`${currentQuestion.id}-yes`}
                                        >
                                            Yes
                                        </FieldLabel>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value="false"
                                            id={`${currentQuestion.id}-no`}
                                        />
                                        <FieldLabel
                                            htmlFor={`${currentQuestion.id}-no`}
                                        >
                                            No
                                        </FieldLabel>
                                    </div>
                                </RadioGroup>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                );

            case 'text':
                return (
                    <Controller
                        name={currentQuestion.id}
                        control={form.control}
                        rules={{
                            required: currentQuestion.required
                                ? 'This question is required'
                                : false,
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>{currentQuestion.text}</FieldLabel>

                                <Textarea
                                    {...field}
                                    value={String(field.value ?? '')}
                                    placeholder="Enter your answer..."
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                );

            case 'number':
                return (
                    <Controller
                        name={currentQuestion.id}
                        control={form.control}
                        rules={{
                            required: currentQuestion.required
                                ? 'This question is required'
                                : false,
                            validate: (value) =>
                                value === undefined ||
                                value === '' ||
                                Number.isFinite(Number(value)) ||
                                'Please enter a valid number',
                        }}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>{currentQuestion.text}</FieldLabel>

                                <Input
                                    type="number"
                                    value={
                                        field.value === undefined
                                            ? ''
                                            : String(field.value)
                                    }
                                    onChange={(event) =>
                                        field.onChange(
                                            event.target.value === ''
                                                ? undefined
                                                : Number(event.target.value),
                                        )
                                    }
                                    aria-invalid={fieldState.invalid}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                );

            default:
                return <p>Unsupported question type.</p>;
        }
    };

    const handleBack = () => {
        const previousQuestionId =
            completedQuestionIds[completedQuestionIds.length - 1];

        if (!previousQuestionId) return;

        setCompletedQuestionIds((previous) => previous.slice(0, -1));
        setCurrentQuestionId(previousQuestionId);
    };

    return (
        <div className="space-y-6 border p-6 rounded-lg">
            <div>
                <p className="text-sm text-muted-foreground">
                    Question {completedQuestionIds.length + 1}
                </p>

                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                    <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                            width: `${
                                (completedQuestionIds.length /
                                    workflow.questions.length) *
                                100
                            }%`,
                        }}
                    />
                </div>
            </div>

            {renderQuestion()}

            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    disabled={completedQuestionIds.length === 0}
                >
                    Back
                </Button>

                <Button type="button" onClick={handleNext}>
                    Continue
                </Button>
            </div>
        </div>
    );
}
