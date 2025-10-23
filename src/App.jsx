import { useState, useCallback, useEffect } from "react";
import { TaskProvider, useTask } from "./context/TaskContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider, useToast } from "./context/ToastContext";
import { ACTIONS } from "./utils/constants";
import Board from "./components/Board/Board";
import CardModal from "./components/Card/CardModal";
import AddListModal from "./components/List/AddListModal";
import EditListModal from "./components/List/EditListModal";
import FilterBar from "./components/Layout/FilterBar";
import Header from "./components/Layout/Header";
import ConfirmModal from "./components/UI/ConfirmModal";
import { useDebounce } from "./hooks/useDebounce";

function AppContent() {
  const { state, dispatch, getActiveBoard, getAllTags } = useTask();
  const toast = useToast();

  // Search state
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Modal states
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isEditListModalOpen, setIsEditListModalOpen] = useState(false);
  const [showDeleteListConfirm, setShowDeleteListConfirm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [listToDelete, setListToDelete] = useState(null);

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
      setListToDelete(list);
      setShowDeleteListConfirm(true);
    },
    [activeBoard]
  );

  const confirmDeleteList = useCallback(() => {
    if (listToDelete) {
      dispatch({
        type: ACTIONS.DELETE_LIST,
        payload: {
          boardId: state.activeBoard,
          listId: listToDelete.id,
        },
      });
      toast.success("List deleted successfully!");
      setListToDelete(null);
    }
  }, [dispatch, state.activeBoard, toast, listToDelete]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Header */}
      <Header onSearchChange={handleSearchChange} searchValue={searchInput} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6 h-[calc(100vh-88px)]">
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

      {/* Filter Sidebar */}
      <FilterBar
        filters={state.filters}
        onPriorityChange={handlePriorityChange}
        onTagChange={handleTagChange}
        onClearFilters={handleClearFilters}
        availableTags={availableTags}
      />

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

      <ConfirmModal
        isOpen={showDeleteListConfirm}
        onClose={() => {
          setShowDeleteListConfirm(false);
          setListToDelete(null);
        }}
        onConfirm={confirmDeleteList}
        title="Delete List"
        message={
          listToDelete
            ? `Are you sure you want to delete "${listToDelete.title}"${
                listToDelete.cards?.length > 0
                  ? ` and its ${listToDelete.cards.length} card${
                      listToDelete.cards.length > 1 ? "s" : ""
                    }`
                  : ""
              }? This action cannot be undone.`
            : ""
        }
        variant="danger"
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
