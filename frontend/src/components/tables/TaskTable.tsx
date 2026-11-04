import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Task, TaskStatus } from '@/types/task';
import { Link } from '@tanstack/react-router';

type TaskTableProps = {
    tasks: Task[];
};

function getStatusVariant(status: TaskStatus) {
    switch (status) {
        case 'COMPLETED':
            return 'default';
        case 'IN_PROGRESS':
            return 'secondary';
        case 'PENDING':
            return 'outline';
    }
}

function getStatusClassName(status: TaskStatus) {
    switch (status) {
        case 'COMPLETED':
            return 'bg-green-100 text-green-800 border-green-200';

        case 'IN_PROGRESS':
            return 'bg-blue-100 text-blue-800 border-blue-200';

        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
}

export function TaskTable({ tasks }: TaskTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Due date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {tasks.map((task) => (
                    <TableRow key={task.id}>
                        <TableCell className="font-medium">
                            {task.workflow.name}
                        </TableCell>

                        <TableCell>
                            {new Date(task.dueDate).toLocaleString()}
                        </TableCell>

                        <TableCell>
                            <Badge
                                variant={getStatusVariant(task.status)}
                                className={getStatusClassName(task.status)}
                            >
                                {task.status.replace('_', ' ')}
                            </Badge>
                        </TableCell>

                        <TableCell className="text-right">
                            <Button size="sm">
                                <Link
                                    to="/tasks/$taskId"
                                    params={{ taskId: task.id }}
                                >
                                    {task.status === 'COMPLETED'
                                        ? 'View'
                                        : task.status === 'IN_PROGRESS'
                                          ? 'Continue'
                                          : 'Start'}
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}

                {tasks.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={3} className="text-center">
                            No tasks found for this store.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
