import { useState } from "react";
import { X, Plus } from "lucide-react";

const TagInput = ({ tags = [], onChange, placeholder = "Add tags..." }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full">
      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1.5
                bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30
                text-indigo-700 dark:text-indigo-300
                rounded-lg text-sm font-semibold
                border border-indigo-200/50 dark:border-indigo-700/50
                transition-all duration-300
                hover:shadow-md hover:scale-105
                group
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="
                  hover:bg-indigo-200 dark:hover:bg-indigo-800 
                  rounded-full p-0.5
                  transition-all duration-300
                  group-hover:rotate-90
                "
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Container */}
      <div className="relative">
        <Plus
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full px-4 py-2.5 pl-10
            bg-gray-50 dark:bg-gray-800/50
            border border-gray-200 dark:border-gray-700
            rounded-xl
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-300 dark:focus:border-indigo-600 focus:bg-white dark:focus:bg-gray-800
            transition-all duration-300
            font-medium text-sm
          "
        />
        {input && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-indigo-500 dark:text-indigo-400 font-semibold">
            Press Enter ↵
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
        Press Enter to add • Backspace to remove last tag
      </p>
    </div>
  );
};

export default TagInput;
