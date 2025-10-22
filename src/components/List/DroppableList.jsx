import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import DraggableCard from "../Card/DraggableCard";
import Button from "../UI/Button";
import ListMenu from "./ListMenu";

const DroppableList = ({
  list,
  onAddCard,
  onCardClick,
  onEditList,
  onDeleteList,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: list.id,
    data: {
      type: "list",
      list,
    },
  });

  const cardIds = list.cards.map((card) => card.id);

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
        <ListMenu
          onEdit={() => onEditList(list)}
          onDelete={() => onDeleteList(list.id)}
        />
      </div>

      {/* Cards Container - Droppable */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 overflow-y-auto space-y-2 mb-3 min-h-[100px]
          ${isOver ? "bg-blue-50 dark:bg-blue-900/20 rounded-lg" : ""}
          transition-colors duration-200
        `}
      >
        <SortableContext items={cardIds} strategy={verticalListSortingStrategy}>
          {list.cards.map((card) => (
            <DraggableCard
              key={card.id}
              card={card}
              onClick={() => onCardClick(card)}
            />
          ))}
        </SortableContext>

        {/* Empty state */}
        {list.cards.length === 0 && (
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Drop cards here
            </p>
          </div>
        )}
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

export default DroppableList;
