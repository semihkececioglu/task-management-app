import { TaskProvider } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
          <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Task Managament App
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Context API ve Reducer çalışıyor!
            </p>
          </div>
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
