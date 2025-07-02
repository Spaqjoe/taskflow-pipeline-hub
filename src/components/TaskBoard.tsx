
import { useState } from "react";
import { TaskColumn } from "./TaskColumn";
import { AddTaskModal } from "./AddTaskModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  status: "todo" | "pending" | "done";
  createdAt: string;
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create mockups and wireframes for the new product landing page",
    priority: "high",
    dueDate: "2025-07-05",
    status: "todo",
    createdAt: "2025-07-02"
  },
  {
    id: "2",
    title: "Review code changes",
    description: "Review pull requests from the development team",
    priority: "medium",
    status: "pending",
    createdAt: "2025-07-01"
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with latest changes",
    priority: "low",
    status: "done",
    createdAt: "2025-06-30"
  }
];

export const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const handleAddTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, task]);
  };

  const handleMoveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const todoTasks = tasks.filter(task => task.status === "todo");
  const pendingTasks = tasks.filter(task => task.status === "pending");
  const doneTasks = tasks.filter(task => task.status === "done");

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          status="todo"
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          color="blue"
        />
        <TaskColumn
          title="In Progress"
          tasks={pendingTasks}
          status="pending"
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          color="yellow"
        />
        <TaskColumn
          title="Done"
          tasks={doneTasks}
          status="done"
          onMoveTask={handleMoveTask}
          onDeleteTask={handleDeleteTask}
          color="green"
        />
      </div>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8">
        <Button
          onClick={() => setIsAddTaskOpen(true)}
          size="lg"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 dark:from-blue-600 dark:to-purple-700 dark:hover:from-blue-700 dark:hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </div>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};
