// Action Types
export const ACTIONS = {
  // Board Actions
  ADD_BOARD: "ADD_BOARD",
  DELETE_BOARD: "DELETE_BOARD",
  UPDATE_BOARD: "UPDATE_BOARD",
  SET_ACTIVE_BOARD: "SET_ACTIVE_BOARD",

  // List Actions
  ADD_LIST: "ADD_LIST",
  DELETE_LIST: "DELETE_LIST",
  UPDATE_LIST: "UPDATE_LIST",
  MOVE_LIST: "MOVE_LIST",

  // Card Actions
  ADD_CARD: "ADD_CARD",
  DELETE_CARD: "DELETE_CARD",
  UPDATE_CARD: "UPDATE_CARD",
  MOVE_CARD: "MOVE_CARD",

  // Filter Actions
  SET_SEARCH: "SET_SEARCH",
  SET_PRIOROTY_FILTER: "SET_PRIORITY_FILTER",
  SET_TAG_FILTER: "SET_TAG_FILTER",
  CLEAR_FILTERS: "CLEAR_FILTERS",
};

// Priority Levels
export const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

// Priortiy Colors
export const PRIORITY_COLORS = {
  [PRIORITY.LOW]: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-300 dark:border-green-700",
  },
  [PRIORITY.MEDIUM]: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-300 dark:border-yellow-700",
  },
  [PRIORITY.HIGH]: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-300 dark:border-red-700",
  },
};

// Initial Data
export const INITIAL_STATE = {
  boards: [
    {
      id: "board-1",
      title: "My First Board",
      createdAt: Date.now(),
      lists: [
        {
          id: "list-1",
          title: "To Do",
          cards: [
            {
              id: "card-1",
              title: "Welcome to Task Manager",
              description:
                "This is your firs task. Click to edit or drag to move!",
              priority: PRIORITY.MEDIUM,
              dueDate: null,
              tags: ["welcome"],
              createdAt: Date.now(),
            },
          ],
        },
        {
          id: "list-2",
          title: "In Progress",
          cards: [],
        },
        {
          id: "list-3",
          title: "Done",
          cards: [],
        },
      ],
    },
  ],
  activeBoard: "board-1",
  filters: {
    search: "",
    priority: "all",
    tags: [],
  },
};
