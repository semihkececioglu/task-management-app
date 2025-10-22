import { createContext, useContext, useReducer, useEffect } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { INITIAL_STATE } from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // LocalStorage'dan veri yükle veya initial state kullan
  const [savedState, setSavedState] = useLocalStorage(
    "taskManagerState",
    INITIAL_STATE
  );

  const [state, dispatch] = useReducer(taskReducer, savedState);

  // State her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

  // Helper function: Get active board
  const getActiveBoard = () => {
    return state.boards.find((board) => board.id === state.activeBoard);
  };

  // Helper function: Get all tags
  const getAllTags = () => {
    const tags = new Set();
    state.boards.forEach((board) => {
      board.lists.forEach((list) => {
        list.cards.forEach((card) => {
          card.tags.forEach((tag) => tags.add(tag));
        });
      });
    });
    return Array.from(tags);
  };

  const value = {
    state,
    dispatch,
    getActiveBoard,
    getAllTags,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use TaskContext
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within TaskProvider");
  }
  return context;
};
