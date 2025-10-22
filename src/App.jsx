import { useState, useCallback, useEffect } from "react";
import { TaskProvider, useTask } from "./context/TaskContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import { ACTIONS } from "./utils/constants";
import { Moon, Sun, Search } from "lucide-react";
import Board from "./components/Board/Board";
import CardModal from "./components/Card/CardModal";
import AddListModal from "./components/List/AddListModal";
import EditListModal from "./components/List/EditListModal";
import FilterBar from "./components/Layout/FilterBar";
import { useDebounce } from "./hooks/useDebounce";

function AppContent() {
  const { state, dispatch, getActiveBoard, getAllTags } = useTask();
  const { isDark, toggleTheme } = useTheme();
  const toast = useToast();

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedList, setSelectedList] = useState(null);

  const activeBoard = getActiveBoard();
  const availableTags = getAllTags();

  // Debounced search effect
  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_SEARCH,
      payload: { search: debouncedSearch },
    });
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = useCallback((value) => {
    setSearchInput(value);
  }, []);

  // AppContent içinde, useEffect'ten sonra ekle:
  useEffect(() => {
    console.log("Current filters:", state.filters);
    console.log("Search input:", searchInput);
    console.log("Debounced search:", debouncedSearch);
  }, [state.filters, searchInput, debouncedSearch]);

  const handlePriorityChange = useCallback(
    (priority) => {
      dispatch({
        type: ACTIONS.SET_PRIORITY_FILTER,
        payload: { priority },
      });
    },
    [dispatch]
  );

  const handleTagChange = useCallback(
    (tags) => {
      dispatch({
        type: ACTIONS.SET_TAG_FILTER,
        payload: { tags },
      });
    },
    [dispatch]
  );

  const handleClearFilters = useCallback(() => {
    setSearchInput("");
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
    toast.info("Filters cleared");
  }, [dispatch, toast]);

  const handleAddList = useCallback(() => {
    setIsAddListModalOpen(true);
  }, []);

  const handleSaveList = useCallback(
    (title) => {
      dispatch({
        type: ACTIONS.ADD_LIST,
        payload: {
          boardId: state.activeBoard,
          title,
        },
      });
      toast.success("List created successfully!");
    },
    [dispatch, state.activeBoard, toast]
  );

  const handleEditList = useCallback((list) => {
    setSelectedList(list);
    setIsEditListModalOpen(true);
  }, []);

  const handleUpdateList = useCallback(
    (listId, title) => {
      dispatch({
        type: ACTIONS.UPDATE_LIST,
        payload: {
          boardId: state.activeBoard,
          listId,
          title,
        },
      });
      toast.success("List updated successfully!");
    },
    [dispatch, state.activeBoard, toast]
  );

  const handleDeleteList = useCallback(
    (listId) => {
      const list = activeBoard?.lists.find((l) => l.id === listId);
      const cardCount = list?.cards.length || 0;

      const message =
        cardCount > 0
          ? `Delete "${list.title}" and its ${cardCount} card${
              cardCount > 1 ? "s" : ""
            }?`
          : `Delete "${list.title}"?`;

      if (window.confirm(message)) {
        dispatch({
          type: ACTIONS.DELETE_LIST,
          payload: {
            boardId: state.activeBoard,
            listId,
          },
        });
        toast.success("List deleted successfully!");
      }
    },
    [dispatch, state.activeBoard, toast, activeBoard]
  );

  const handleAddCard = useCallback((listId) => {
    setSelectedListId(listId);
    setSelectedCard(null);
    setIsCardModalOpen(true);
  }, []);

  const handleCardClick = useCallback(
    (card) => {
      const list = activeBoard?.lists.find((list) =>
        list.cards.some((c) => c.id === card.id)
      );
      if (list) {
        setSelectedListId(list.id);
        setSelectedCard(card);
        setIsCardModalOpen(true);
      }
    },
    [activeBoard]
  );

  const handleSaveCard = useCallback(
    (cardData) => {
      if (selectedCard) {
        dispatch({
          type: ACTIONS.UPDATE_CARD,
          payload: {
            boardId: state.activeBoard,
            listId: selectedListId,
            cardId: selectedCard.id,
            updates: cardData,
          },
        });
        toast.success("Card updated successfully!");
      } else {
        dispatch({
          type: ACTIONS.ADD_CARD,
          payload: {
            boardId: state.activeBoard,
            listId: selectedListId,
            ...cardData,
          },
        });
        toast.success("Card created successfully!");
      }
    },
    [dispatch, state.activeBoard, selectedListId, selectedCard, toast]
  );

  const handleDeleteCard = useCallback(() => {
    if (selectedCard) {
      dispatch({
        type: ACTIONS.DELETE_CARD,
        payload: {
          boardId: state.activeBoard,
          listId: selectedListId,
          cardId: selectedCard.id,
        },
      });
      toast.success("Card deleted successfully!");
    }
  }, [dispatch, state.activeBoard, selectedListId, selectedCard, toast]);

  const handleMoveCard = useCallback(
    ({
      sourceListId,
      destinationListId,
      cardId,
      sourceIndex,
      destinationIndex,
    }) => {
      dispatch({
        type: ACTIONS.MOVE_CARD,
        payload: {
          boardId: state.activeBoard,
          sourceListId,
          destinationListId,
          sourceIndex,
          destinationIndex,
        },
      });
    },
    [dispatch, state.activeBoard]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Task Manager
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Organize your work efficiently
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="
                  w-full pl-10 pr-4 py-2 
                  bg-gray-100 dark:bg-gray-700 
                  rounded-lg 
                  text-gray-900 dark:text-gray-100
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800
                  transition-all duration-200
                "
              />
              {searchInput && debouncedSearch !== searchInput && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  searching...
                </span>
              )}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="
              p-2 rounded-lg 
              hover:bg-gray-100 dark:hover:bg-gray-700 
              transition-colors
              group
            "
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun
                size={20}
                className="text-gray-300 group-hover:text-yellow-400 transition-colors"
              />
            ) : (
              <Moon
                size={20}
                className="text-gray-700 group-hover:text-blue-600 transition-colors"
              />
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 h-[calc(100vh-88px)]">
        {/* Filter Bar */}
        <FilterBar
          filters={state.filters}
          onPriorityChange={handlePriorityChange}
          onTagChange={handleTagChange}
          onClearFilters={handleClearFilters}
          availableTags={availableTags}
        />

        {/* Board */}
        <Board
          board={activeBoard}
          filters={state.filters}
          onAddList={handleAddList}
          onAddCard={handleAddCard}
          onCardClick={handleCardClick}
          onMoveCard={handleMoveCard}
          onEditList={handleEditList}
          onDeleteList={handleDeleteList}
        />
      </main>

      {/* Modals */}
      <AddListModal
        isOpen={isAddListModalOpen}
        onClose={() => setIsAddListModalOpen(false)}
        onSave={handleSaveList}
      />

      <EditListModal
        isOpen={isEditListModalOpen}
        onClose={() => setIsEditListModalOpen(false)}
        list={selectedList}
        onSave={handleUpdateList}
      />

      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        card={selectedCard}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
