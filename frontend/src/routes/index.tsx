import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { StoreSelectionForm } from '@/components/forms/tasks/StoreSelectionForm';
import { useQuery } from '@tanstack/react-query';
import { getTasksByStore } from '@/lib/storeApi';
import { TaskTable } from '@/components/tables/TaskTable';

function useTasks(storeId: string) {
    return useQuery({
        queryKey: ['tasks', storeId],
        queryFn: () => getTasksByStore(storeId),
        enabled: !!storeId,
    });
}

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    const [selectedStoreId, setSelectedStoreId] = useState('');

    const stores = [
        { id: 'store-001', name: 'store-001' },
        { id: 'store-002', name: 'store-002' },
    ];

    const {
        data: tasks = [],
        isFetching: isFetchingTasks,
        isError,
        error,
        isSuccess,
    } = useTasks(selectedStoreId);

    const handleSubmit = (data: { storeId: string }) => {
        console.log('Selected store:', data.storeId);

        setSelectedStoreId(data.storeId);
    };

    return (
        <>
            <main className="container mx-auto max-w-xl py-10">
                <StoreSelectionForm stores={stores} onSubmit={handleSubmit} />

                {isFetchingTasks && <p>Loading tasks...</p>}

                {isError && <p className="text-destructive">{error.message}</p>}

                {isSuccess && !isFetchingTasks && (
                    <div className="mt-12">
                        <section className="space-y-4">
                            <h2 className="text-xl font-semibold">
                                Store Tasks
                            </h2>
                            <TaskTable tasks={tasks} />
                        </section>
                    </div>
                )}
            </main>
        </>
    );
}
