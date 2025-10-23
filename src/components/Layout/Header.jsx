import { Moon, Sun, Search, CheckSquare } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ onSearchChange, searchValue }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-500 dark:bg-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
              <CheckSquare size={20} className="text-white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                Task Manager
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Stay organized
              </p>
            </div>
            {/* Mobile Title */}
            <h1 className="sm:hidden text-base font-bold text-gray-900 dark:text-white">
              Tasks
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md sm:max-w-xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
                size={16}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="
                  w-full pl-9 pr-3 py-2
                  bg-gray-100/80 dark:bg-gray-800/80
                  border-0
                  rounded-lg sm:rounded-xl
                  text-sm text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/50
                  focus:bg-white dark:focus:bg-gray-800
                  transition-all duration-200
                "
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10
              flex items-center justify-center
              rounded-lg sm:rounded-xl
              bg-gray-100 dark:bg-gray-800
              hover:bg-gray-200 dark:hover:bg-gray-700
              transition-colors duration-200
            "
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun size={18} className="text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
