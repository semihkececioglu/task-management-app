import { ACTIONS } from "../utils/constants";
import { generateId } from "../utils/helpers";

export const taskReducer = (state, action) => {
  switch (action.type) {
    // ==================== BOARD ACTIONS ====================
    case ACTIONS.ADD_BOARD: {
      const newBoard = {
        id: generateId("board"),
        title: action.payload.title,
        createdAt: Date.now(),
        lists: [],
      };
      return {
        ...state,
        boards: [...state.boards, newBoard],
        activeBoard: newBoard.id,
      };
    }

    case ACTIONS.DELETE_BOARD: {
      const filteredBoards = state.boards.filter(
        (b) => b.id !== action.payload.boardId
      );
      return {
        ...state,
        boards: filteredBoards,
        activeBoard: filteredBoards.length > 0 ? filteredBoards[0].id : null,
      };
    }

    case ACTIONS.UPDATE_BOARD: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? { ...board, title: action.payload.title }
            : board
        ),
      };
    }

    case ACTIONS.SET_ACTIVE_BOARD: {
      return {
        ...state,
        activeBoard: action.payload.boardId,
      };
    }

    // ==================== LIST ACTIONS ====================
    case ACTIONS.ADD_LIST: {
      const newList = {
        id: generateId("list"),
        title: action.payload.title,
        cards: [],
      };

      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? { ...board, lists: [...board.lists, newList] }
            : board
        ),
      };
    }

    case ACTIONS.DELETE_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.filter(
                  (list) => list.id !== action.payload.listId
                ),
              }
            : board
        ),
      };
    }

    case ACTIONS.UPDATE_LIST: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.listId
                    ? { ...list, title: action.payload.title }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case ACTIONS.MOVE_LIST: {
      const board = state.boards.find((b) => b.id === action.payload.boardId);
      if (!board) return state;

      const lists = [...board.lists];
      const [movedList] = lists.splice(action.payload.oldIndex, 1);
      lists.splice(action.payload.newIndex, 0, movedList);

      return {
        ...state,
        boards: state.boards.map((b) =>
          b.id === action.payload.boardId ? { ...b, lists } : b
        ),
      };
    }

    // ==================== CARD ACTIONS ====================
    case ACTIONS.ADD_CARD: {
      const newCard = {
        id: generateId("card"),
        title: action.payload.title,
        description: action.payload.description || "",
        priority: action.payload.priority || "medium",
        dueDate: action.payload.dueDate || null,
        tags: action.payload.tags || [],
        createdAt: Date.now(),
      };

      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.listId
                    ? { ...list, cards: [...list.cards, newCard] }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case ACTIONS.DELETE_CARD: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.filter(
                          (card) => card.id !== action.payload.cardId
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case ACTIONS.UPDATE_CARD: {
      return {
        ...state,
        boards: state.boards.map((board) =>
          board.id === action.payload.boardId
            ? {
                ...board,
                lists: board.lists.map((list) =>
                  list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map((card) =>
                          card.id === action.payload.cardId
                            ? { ...card, ...action.payload.updates }
                            : card
                        ),
                      }
                    : list
                ),
              }
            : board
        ),
      };
    }

    case ACTIONS.MOVE_CARD: {
      const {
        boardId,
        sourceListId,
        destinationListId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return state;

      const sourceList = board.lists.find((l) => l.id === sourceListId);
      const destinationList = board.lists.find(
        (l) => l.id === destinationListId
      );

      if (!sourceList || !destinationList) return state;

      // Same list reorder
      if (sourceListId === destinationListId) {
        const cards = [...sourceList.cards];
        const [movedCard] = cards.splice(sourceIndex, 1);
        cards.splice(destinationIndex, 0, movedCard);

        return {
          ...state,
          boards: state.boards.map((b) =>
            b.id === boardId
              ? {
                  ...b,
                  lists: b.lists.map((list) =>
                    list.id === sourceListId ? { ...list, cards } : list
                  ),
                }
              : b
          ),
        };
      }

      // Different list move
      const sourceCards = [...sourceList.cards];
      const destinationCards = [...destinationList.cards];
      const [movedCard] = sourceCards.splice(sourceIndex, 1);
      destinationCards.splice(destinationIndex, 0, movedCard);

      return {
        ...state,
        boards: state.boards.map((b) =>
          b.id === boardId
            ? {
                ...b,
                lists: b.lists.map((list) => {
                  if (list.id === sourceListId) {
                    return { ...list, cards: sourceCards };
                  }
                  if (list.id === destinationListId) {
                    return { ...list, cards: destinationCards };
                  }
                  return list;
                }),
              }
            : b
        ),
      };
    }

    // ==================== FILTER ACTIONS ====================
    case ACTIONS.SET_SEARCH: {
      return {
        ...state,
        filters: {
          ...state.filters,
          search: action.payload.search,
        },
      };
    }

    case ACTIONS.SET_PRIORITY_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          priority: action.payload.priority,
        },
      };
    }

    case ACTIONS.SET_TAG_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          tags: action.payload.tags,
        },
      };
    }

    case ACTIONS.CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          search: "",
          priority: "all",
          tags: [],
        },
      };
    }

    default:
      return state;
  }
};
