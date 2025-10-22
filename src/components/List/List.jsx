import { MoreVertical, Plus } from "lucide-react";
import Card from "../Card/Card";
import Button from "../UI/Button";

const List = ({ list, onAddCard, onCardClick }) => {
  return (
    <div
      className="
      flex-shrink-0 w-80
      bg-gray-100 dark:bg-gray-800
      rounded-lg p-3
      flex flex-col
      max-h-full
    "
    >
      {/* List Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {list.title}
          </h3>
          <span
            className="
            px-2 py-0.5 
            bg-gray-200 dark:bg-gray-700 
            text-gray-600 dark:text-gray-400 
            rounded-full text-xs
          "
          >
            {list.cards.length}
          </span>
        </div>
        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          <MoreVertical
            size={16}
            className="text-gray-600 dark:text-gray-400"
          />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {list.cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => onCardClick(card)} />
        ))}
      </div>

      {/* Add Card Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onAddCard}
        className="w-full justify-start text-gray-600 dark:text-gray-400"
      >
        <Plus size={16} className="mr-2" />
        Add a card
      </Button>
    </div>
  );
};

export default List;
