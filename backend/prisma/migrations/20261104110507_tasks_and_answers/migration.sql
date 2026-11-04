-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "assignedTo" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_answers" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tasks_storeId_dueDate_idx" ON "tasks"("storeId", "dueDate");

-- CreateIndex
CREATE UNIQUE INDEX "task_answers_taskId_questionId_key" ON "task_answers"("taskId", "questionId");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_answers" ADD CONSTRAINT "task_answers_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
