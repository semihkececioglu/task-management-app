import { useState } from "react";
import { X } from "lucide-react";

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
      <div
        className="
        flex flex-wrap gap-2 p-2
        bg-white dark:bg-gray-800 
        border border-gray-300 dark:border-gray-600 
        rounded-lg
        focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
      "
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="
              inline-flex items-center gap-1
              px-2 py-1
              bg-blue-100 dark:bg-blue-900/30
              text-blue-700 dark:text-blue-300
              rounded text-sm
            "
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-blue-900 dark:hover:text-blue-100"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="
            flex-1 min-w-[120px]
            bg-transparent
            outline-none
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
          "
        />
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Press Enter to add tags
      </p>
    </div>
  );
};

export default TagInput;
