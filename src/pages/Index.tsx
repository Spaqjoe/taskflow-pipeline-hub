
import { TaskBoard } from "@/components/TaskBoard";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">MyTasks1</h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">Organize your work, achieve your goals</p>
        </div>
        <TaskBoard />
      </main>
    </div>
  );
};

export default Index;
