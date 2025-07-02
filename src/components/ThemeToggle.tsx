
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
    >
      {theme === 'light' ? (
        <>
          <Moon className="w-4 h-4 mr-2" />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className="w-4 h-4 mr-2" />
          Light Mode
        </>
      )}
    </Button>
  );
};
