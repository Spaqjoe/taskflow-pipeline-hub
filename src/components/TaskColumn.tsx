
import { TaskCard } from "./TaskCard";
import { Task } from "./TaskBoard";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  status: Task["status"];
  onMoveTask: (taskId: string, newStatus: Task["status"]) => void;
  onDeleteTask: (taskId: string) => void;
  color: "blue" | "yellow" | "green";
}

export const TaskColumn = ({ 
  title, 
  tasks, 
  status, 
  onMoveTask, 
  onDeleteTask, 
  color 
}: TaskColumnProps) => {
  const colorClasses = {
    blue: "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30",
    yellow: "border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/30",
    green: "border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30"
  };

  const titleColors = {
    blue: "text-blue-700 dark:text-blue-300",
    yellow: "text-yellow-700 dark:text-yellow-300",
    green: "text-green-700 dark:text-green-300"
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-3 sm:p-4 min-h-[400px] sm:min-h-[500px]`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className={`font-semibold text-base sm:text-lg ${titleColors[color]}`}>
          {title}
        </h3>
        <span className="bg-white dark:bg-gray-800 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-2 sm:space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-6 sm:py-8 text-gray-500 dark:text-gray-400">
            <p className="text-xs sm:text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
