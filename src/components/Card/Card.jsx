import { memo } from "react";
import { Clock, Tag, GripVertical } from "lucide-react";
import { PRIORITY_COLORS } from "../../utils/constants";
import { formatDate, isOverdue, isDueToday } from "../../utils/helpers";

const Card = memo(({ card, onClick, isDragging = false }) => {
  const priorityColor = PRIORITY_COLORS[card.priority];

  const getDueDateColor = () => {
    if (!card.dueDate) return "";
    if (isOverdue(card.dueDate)) return "text-red-600 dark:text-red-400";
    if (isDueToday(card.dueDate)) return "text-yellow-600 dark:text-yellow-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <div
      onClick={onClick}
      className={`
        group
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-lg p-3 
        cursor-pointer
        hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600
        transition-all duration-200
        ${isDragging ? "opacity-50 rotate-3" : ""}
      `}
    >
      {/* Drag Handle */}
      <div className="flex items-start gap-2">
        <GripVertical
          size={16}
          className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing flex-shrink-0 mt-1"
        />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
            {card.title}
          </h4>

          {/* Description preview */}
          {card.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {card.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            {/* Priority Badge */}
            <span
              className={`
                px-2 py-1 rounded-full font-medium
                ${priorityColor.bg} ${priorityColor.text}
              `}
            >
              {card.priority}
            </span>

            {/* Due Date */}
            {card.dueDate && (
              <div className={`flex items-center gap-1 ${getDueDateColor()}`}>
                <Clock size={12} />
                <span>{formatDate(card.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="
                    inline-flex items-center gap-1
                    px-2 py-0.5 
                    bg-gray-100 dark:bg-gray-700 
                    text-gray-700 dark:text-gray-300
                    rounded text-xs
                  "
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Card.displayName = "Card";

export default Card;
