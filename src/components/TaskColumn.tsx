
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
    blue: "border-blue-200 bg-blue-50/50",
    yellow: "border-yellow-200 bg-yellow-50/50",
    green: "border-green-200 bg-green-50/50"
  };

  const titleColors = {
    blue: "text-blue-700",
    yellow: "text-yellow-700",
    green: "text-green-700"
  };

  return (
    <div className={`rounded-xl border-2 ${colorClasses[color]} p-4 min-h-[500px]`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`font-semibold text-lg ${titleColors[color]}`}>
          {title}
        </h3>
        <span className="bg-white rounded-full px-3 py-1 text-sm font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMoveTask={onMoveTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
