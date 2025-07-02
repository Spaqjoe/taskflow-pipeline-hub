
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
    low: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200"
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
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1">
          {task.title}
        </h4>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {prevStatus && (
              <DropdownMenuItem onClick={() => onMoveTask(task.id, prevStatus)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Move Back
              </DropdownMenuItem>
            )}
            {nextStatus && (
              <DropdownMenuItem onClick={() => onMoveTask(task.id, nextStatus)}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Move Forward
              </DropdownMenuItem>
            )}
            <DropdownMenuItem 
              onClick={() => onDeleteTask(task.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {task.description && (
        <p className="text-gray-600 text-xs mb-3 leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            <AlertCircle className="w-3 h-3 inline mr-1" />
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};
