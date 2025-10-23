import { Filter, X } from "lucide-react";
import { PRIORITY } from "../../utils/constants";
import Button from "../UI/Button";
import Dropdown from "../UI/Dropdown";

const FilterBar = ({
  filters,
  onPriorityChange,
  onTagChange,
  onClearFilters,
  availableTags = [],
}) => {
  const hasActiveFilters =
    filters.priority !== "all" || filters.tags.length > 0;

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
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
    <div className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-5 mb-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <Filter size={18} className="text-gray-500 dark:text-gray-400" />
          <h3 className="font-bold text-gray-900 dark:text-white tracking-tight">
            Filters
          </h3>
          {hasActiveFilters && (
            <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold">
              Active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <X size={16} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 tracking-tight">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="
              w-full px-4 py-2.5
              bg-gray-50 dark:bg-gray-800/50
              border border-gray-200 dark:border-gray-700
              rounded-xl
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-600
              transition-all duration-300
              font-medium text-[15px]
            "
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tags Filter */}
        {availableTags.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 tracking-tight">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isSelected = filters.tags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1.5 rounded-xl text-sm font-semibold
                      transition-all duration-300
                      ${
                        isSelected
                          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/30 scale-105"
                          : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50 border border-gray-200/50 dark:border-gray-600/30"
                      }
                    `}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
