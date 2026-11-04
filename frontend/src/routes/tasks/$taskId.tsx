import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { WorkflowForm } from '@/components/forms/tasks/WorkflowForm';
import { getTaskById, completeTask, saveTaskAnswer } from '@/lib/storeApi';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/toast';

export const Route = createFileRoute('/tasks/$taskId')({
    component: RouteComponent,
});

function useTask(taskId: string) {
    return useQuery({
        queryKey: ['tasks', 'detail', taskId],
        queryFn: () => getTaskById(taskId),
        enabled: !!taskId,
    });
}

function RouteComponent() {
    const { taskId } = Route.useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: task, isLoading, isError, error } = useTask(taskId);

    // Save individual answers
    const saveAnswerMutation = useMutation({
        mutationFn: (data: { questionId: string; answer: unknown }) =>
            saveTaskAnswer(taskId, data),
    });

    const completeTaskMutation = useMutation({
        mutationFn: () => completeTask(taskId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });

            queryClient.invalidateQueries({
                queryKey: ['tasks', 'detail', taskId],
            });
        },
    });

    if (isLoading) return <p>Loading task...</p>;

    if (isError) {
        return <p className="text-destructive">{error.message}</p>;
    }

    if (!task) return <p>Task not found.</p>;

    const initialAnswers = Object.fromEntries(
        task.answers.map((item) => [item.questionId, item.answer]),
    );

    const handleAnswer = async (questionId: string, answer: unknown) => {
        await saveAnswerMutation.mutateAsync({
            questionId,
            answer,
        });
    };

    const handleComplete = async (answers: Record<string, unknown>) => {
        console.log('Workflow completed:', answers);

        try {
            await completeTaskMutation.mutateAsync();

            // Refresh the dashboard task list
            await queryClient.invalidateQueries({
                queryKey: ['tasks'],
            });

            // task completed
            toast.add({
                title: 'Task Completed',
            });

            // Return to dashboard
            await navigate({ to: '/' });

            console.log('Workflow completed:', answers);
        } catch (error) {
            console.error('Failed to complete task:', error);
        }
    };

    return (
        <main className="container mx-auto max-w-3xl py-10">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Task Execution</h1>
                <Button variant="secondary" size="lg" className="mb-6 w-56">
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4 float-start" />
                        Back to Dashboard
                    </Link>
                </Button>
            </div>
            <div>
                <h1 className="text-2xl font-bold text-cyan-500 mb-6">
                    {task.workflow.name
                        .replaceAll('_', ' ')
                        .replace(/^./, (char) => char.toUpperCase())}
                </h1>
            </div>

            <WorkflowForm
                workflow={task.workflow.rules}
                initialAnswers={initialAnswers}
                onAnswer={handleAnswer}
                onComplete={handleComplete}
            />
        </main>
    );
}
