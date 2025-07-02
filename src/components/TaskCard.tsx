
import { Task } from "./TaskBoard";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Calendar, AlertCircle, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskCard = ({ task, onMoveTask, onDeleteTask }: TaskCardProps) => {
  const priorityColors = {
    low: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
    high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700"
  };

  const getNextStatus = (currentStatus: Task["status"]): Task["status"] | null => {
    switch (currentStatus) {
      case "todo": return "pending";
      case "pending": return "done";
      case "done": return null;
      default: return null;
    }
  };

  const getPrevStatus = (currentStatus: Task["status"]): Task["status"] | null => {
    switch (currentStatus) {
      case "done": return "pending";
      case "pending": return "todo";
      case "todo": return null;
      default: return null;
    }
  };

  const nextStatus = getNextStatus(task.status);
  const prevStatus = getPrevStatus(task.status);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight flex-1 pr-2">
          {task.title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 flex-shrink-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            {prevStatus && (
              <DropdownMenuItem onClick={() => onMoveTask(task.id, prevStatus)} className="dark:hover:bg-gray-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Move Back
              </DropdownMenuItem>
            )}
            {nextStatus && (
              <DropdownMenuItem onClick={() => onMoveTask(task.id, nextStatus)} className="dark:hover:bg-gray-700">
                <ArrowRight className="w-4 h-4 mr-2" />
                Move Forward
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onDeleteTask(task.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/30"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed mb-2 sm:mb-3">
          {task.description}
        </p>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            <AlertCircle className="w-3 h-3 inline mr-1" />
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};
