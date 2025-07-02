
import { Button } from "@/components/ui/button";
import { User, Settings, Menu, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-xl text-gray-800 dark:text-gray-100">MyTasks1</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {user && (
                <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">
                  {user.email}
                </span>
              )}
              <ThemeToggle />
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                onClick={handleAuthClick}
              >
                {user ? (
                  <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </>
                ) : (
                  <>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="sm:hidden flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">MyTasks1</span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                {user && (
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2 px-3">
                    Signed in as: {user.email}
                  </div>
                )}
                <ThemeToggle />
                <Button variant="ghost" size="sm" className="justify-start text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="justify-start text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
                  onClick={handleAuthClick}
                >
                  {user ? (
                    <>
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};
