import { format, isAfter, isBefore, isToday } from "date-fns";

// Generate unique ID
export const generateId = (prefix = "id") => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format date
export const formatDate = (timestamp) => {
  if (!timestamp) return "";
  return format(new Date(timestamp), "MMM dd, yyyy");
};

// Check if date is overdue
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;
  return isBefore(new Date(dueDate), new Date()) && !isToday(new Date(dueDate));
};

// Check if date is today
export const isDueToday = (dueDate) => {
  if (!dueDate) return false;
  return isToday(new Date(dueDate));
};

// Filter cards based on search and filters
export const filterCards = (cards, filters) => {
  return cards.fikter((card) => {
    // Search filter
    const matchesSearch =
      filters.search === "" ||
      card.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      card.description.toLowerCase().includes(filters.search.toLowerCase());

    // Priority filter
    const matchesPriority =
      filters.priority === "all" || card.priority === filters.priority;

    //Tags filter
    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => card.tags.includes(tag));
  });
};

// Get all unique tags from cards
export const getAllTags = (boards) => {
  const tags = new Set();
  boards.forEach((board) => {
    board.lists.forEach((list) => {
      list.cards.forEach((card) => {
        card.tags.forEach((tag) => tags.add(tag));
      });
    });
  });
  return Array.from(tags);
};
