import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { useState } from "react";
import { Plus } from "lucide-react";
import DroppableList from "../List/DroppableList";
import Card from "../Card/Card";
import Button from "../UI/Button";
import { useFilteredCards } from "../../hooks/useFilteredCards";

const Board = ({
  board,
  filters,
  onAddList,
  onAddCard,
  onCardClick,
  onMoveCard,
  onEditList,
  onDeleteList,
}) => {
  const [activeCard, setActiveCard] = useState(null);

  // Apply filters to lists - BURADA SORUN VAR
  const filteredLists = useFilteredCards(board?.lists || [], filters);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.type === "card") {
      setActiveCard(active.data.current.card);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isOverCard = over.data.current?.type === "card";
    const isOverList = over.data.current?.type === "list";

    if (!isOverCard && !isOverList) return;

    // BURADA board.lists KULLANIYORUZ (filtrelenmemiş)
    const activeList = board.lists.find((list) =>
      list.cards.some((card) => card.id === activeId)
    );

    let overList;
    if (isOverCard) {
      overList = board.lists.find((list) =>
        list.cards.some((card) => card.id === overId)
      );
    } else if (isOverList) {
      overList = over.data.current.list;
    }

    if (!activeList || !overList) return;

    const activeIndex = activeList.cards.findIndex(
      (card) => card.id === activeId
    );
    const overIndex = isOverCard
      ? overList.cards.findIndex((card) => card.id === overId)
      : overList.cards.length;

    if (activeList.id === overList.id && activeIndex !== overIndex) {
      onMoveCard({
        sourceListId: activeList.id,
        destinationListId: overList.id,
        cardId: activeId,
        sourceIndex: activeIndex,
        destinationIndex: overIndex,
      });
    }

    if (activeList.id !== overList.id) {
      onMoveCard({
        sourceListId: activeList.id,
        destinationListId: overList.id,
        cardId: activeId,
        sourceIndex: activeIndex,
        destinationIndex: overIndex,
      });
    }
  };

  const handleDragEnd = () => {
    setActiveCard(null);
  };

  const handleDragCancel = () => {
    setActiveCard(null);
  };

  if (!board) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">No board selected</p>
      </div>
    );
  }

  // Check if there are any cards after filtering
  const hasCards = filteredLists.some((list) => list.cards.length > 0);
  const hasActiveFilters =
    filters.search || filters.priority !== "all" || filters.tags.length > 0;

  // Debug - konsola yazdır
  console.log("Board render:", {
    board: board?.title,
    totalLists: board?.lists.length,
    filteredLists: filteredLists.length,
    hasCards,
    hasActiveFilters,
    filters,
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="h-full flex flex-col">
        {/* Board Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {board.title}
          </h2>
          {hasActiveFilters && (
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium px-3 py-1.5 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
              Showing filtered results
            </div>
          )}
        </div>

        {/* Empty state for filters */}
        {hasActiveFilters && !hasCards && (
          <div className="flex items-center justify-center h-64 bg-white/50 dark:bg-gray-800/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2 font-semibold">
                No cards match your filters
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}

        {/* Lists Container - Horizontal Scroll */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-5 h-full pb-4">
            {/* Lists - FİLTRELENMİŞ listeleri kullan */}
            {filteredLists.map((list) => (
              <DroppableList
                key={list.id}
                list={list}
                onAddCard={() => onAddCard(list.id)}
                onCardClick={onCardClick}
                onEditList={onEditList}
                onDeleteList={onDeleteList}
              />
            ))}

            {/* Add List Button */}
            <div className="flex-shrink-0 w-80">
              <Button
                variant="secondary"
                size="md"
                onClick={onAddList}
                className="w-full justify-start hover:shadow-lg transition-all h-fit"
              >
                <Plus size={20} className="mr-2" />
                Add another list
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeCard ? (
          <div className="rotate-3 opacity-90 cursor-grabbing">
            <Card card={activeCard} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
