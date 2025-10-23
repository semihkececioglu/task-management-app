import { useState } from "react";
import { Filter, X, ChevronRight } from "lucide-react";
import { PRIORITY } from "../../utils/constants";
import Button from "../UI/Button";

const FilterBar = ({
  filters,
  onPriorityChange,
  onTagChange,
  onClearFilters,
  availableTags = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    filters.priority !== "all" || filters.tags.length > 0;

  const activeFiltersCount =
    (filters.priority !== "all" ? 1 : 0) + filters.tags.length;

  const priorityOptions = [
    { value: "all", label: "All" },
    { value: PRIORITY.LOW, label: "Low" },
    { value: PRIORITY.MEDIUM, label: "Medium" },
    { value: PRIORITY.HIGH, label: "High" },
  ];

  const toggleTag = (tag) => {
    if (filters.tags.includes(tag)) {
      onTagChange(filters.tags.filter((t) => t !== tag));
    } else {
      onTagChange([...filters.tags, tag]);
    }
  };

  return (
    <>
      {/* Toggle Button - Fixed Position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed right-0 top-24 z-40
          bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
          border border-r-0 border-gray-200/50 dark:border-gray-700/50
          rounded-l-xl px-2.5 py-4
          shadow-xl shadow-gray-300/20 dark:shadow-black/40
          hover:bg-white dark:hover:bg-gray-900
          hover:px-3
          transition-all duration-300
          group
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <Filter
            size={18}
            className="text-gray-600 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
          />
          {hasActiveFilters && (
            <span className="w-5 h-5 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 text-white text-xs font-bold rounded-full shadow-lg shadow-indigo-500/30 animate-pulse">
              {activeFiltersCount}
            </span>
          )}
          <ChevronRight
            size={14}
            className={`text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`
          fixed right-0 top-0 h-full w-80 z-50
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-2xl
          border-l border-gray-200/50 dark:border-gray-800/50
          shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-white/95 to-white/80 dark:from-gray-900/95 dark:to-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 p-5 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <Filter
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                Filters
              </h3>
              {hasActiveFilters && (
                <span className="px-2.5 py-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/30">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X size={18} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold flex items-center gap-1 group"
            >
              <X
                size={12}
                className="group-hover:rotate-90 transition-transform"
              />
              Clear all filters
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* Priority Filter */}
          <div>
            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase flex items-center gap-2">
              <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
              Priority
            </label>
            <div className="flex flex-col gap-2">
              {priorityOptions.map((option) => {
                const isSelected = filters.priority === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => onPriorityChange(option.value)}
                    className={`
                      w-full px-4 py-3 rounded-xl text-sm font-semibold text-left
                      transition-all duration-300
                      flex items-center justify-between
                      ${
                        isSelected
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 scale-[1.02]"
                          : "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600"
                      }
                    `}
                  >
                    <span>{option.label}</span>
                    {isSelected && <span className="text-xs">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 tracking-wider uppercase flex items-center gap-2">
                <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
                Tags
              </label>
              <div className="flex flex-col gap-2">
                {availableTags.map((tag) => {
                  const isSelected = filters.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`
                        w-full px-4 py-3 rounded-xl text-sm font-semibold text-left
                        transition-all duration-300
                        flex items-center justify-between
                        ${
                          isSelected
                            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 scale-[1.02]"
                            : "bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 hover:border-indigo-300 dark:hover:border-indigo-600"
                        }
                      `}
                    >
                      <span>{tag}</span>
                      {isSelected && <span className="text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FilterBar;
