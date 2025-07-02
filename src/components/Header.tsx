
import { Button } from "@/components/ui/button";
import { User, Settings } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-xl text-gray-800 dark:text-gray-100">MyTasks1</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
            <User className="w-4 h-4 mr-2" />
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};
