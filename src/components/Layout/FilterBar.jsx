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
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Filters
          </h3>
          {hasActiveFilters && (
            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
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

      <div className="space-y-3">
        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            value={filters.priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="
              w-full px-3 py-2 
              bg-white dark:bg-gray-800 
              border border-gray-300 dark:border-gray-600 
              rounded-lg 
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                      px-3 py-1 rounded-full text-sm font-medium
                      transition-all duration-200
                      ${
                        isSelected
                          ? "bg-blue-500 text-white shadow-md"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
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
