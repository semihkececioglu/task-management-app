import { MoreVertical, Plus } from "lucide-react";
import Card from "../Card/Card";
import Button from "../UI/Button";

const List = ({ list, onAddCard, onCardClick }) => {
  return (
    <div
      className="
      flex-shrink-0 w-80
      bg-gray-50 dark:bg-gray-800/40
      backdrop-blur-sm
      rounded-2xl p-4
      flex flex-col
      max-h-full
      border border-gray-200/50 dark:border-gray-700/50
    "
    >
      {/* List Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <h3 className="font-bold text-[15px] text-gray-900 dark:text-white tracking-tight">
            {list.title}
          </h3>
          <span
            className="
            px-2 py-0.5 
            bg-white dark:bg-gray-700/50
            text-gray-600 dark:text-gray-300
            rounded-lg text-xs font-semibold
            border border-gray-200/50 dark:border-gray-600/30
          "
          >
            {list.cards.length}
          </span>
        </div>
        <button className="p-1.5 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
          <MoreVertical
            size={18}
            className="text-gray-400 dark:text-gray-500"
          />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-3 scrollbar-thin">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
        ))}
      </div>

      {/* Add Card Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onAddCard}
        className="w-full justify-start text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-700/50 font-medium"
      >
        <Plus size={18} className="mr-2" />
        Add a card
      </Button>
    </div>
  );
};

export default List;
