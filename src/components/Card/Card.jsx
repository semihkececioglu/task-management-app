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
        bg-white dark:bg-gray-800/60
        border border-gray-100 dark:border-gray-700/50
        rounded-xl p-4
        cursor-pointer
        hover:shadow-lg hover:shadow-indigo-100/50 dark:hover:shadow-gray-900/50
        hover:border-indigo-200 dark:hover:border-gray-600
        hover:scale-[1.02]
        transition-all duration-300
        ${isDragging ? "opacity-50 rotate-2 scale-95" : ""}
      `}
    >
      {/* Drag Handle */}
      <div className="flex items-start gap-3">
        <GripVertical
          size={18}
          className="text-gray-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing flex-shrink-0 mt-0.5"
        />

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4 className="font-semibold text-[15px] text-gray-900 dark:text-white mb-2 line-clamp-2 tracking-tight">
            {card.title}
          </h4>

          {/* Description preview */}
          {card.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
              {card.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            {/* Priority Badge */}
            <span
              className={`
                px-2.5 py-1 rounded-lg font-medium tracking-wide
                ${priorityColor.bg} ${priorityColor.text}
              `}
            >
              {card.priority}
            </span>

            {/* Due Date */}
            {card.dueDate && (
              <div
                className={`flex items-center gap-1.5 ${getDueDateColor()} font-medium`}
              >
                <Clock size={13} />
                <span>{formatDate(card.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="
                    inline-flex items-center gap-1
                    px-2 py-1
                    bg-gray-50 dark:bg-gray-700/50
                    text-gray-600 dark:text-gray-300
                    rounded-lg text-xs font-medium
                    border border-gray-200/50 dark:border-gray-600/30
                  "
                >
                  <Tag size={11} />
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
