import { useMemo } from "react";
import { filterCards } from "../utils/helpers";

export const useFilteredCards = (lists, filters) => {
  return useMemo(() => {
    // Eğer hiç filtre aktif değilse, tüm listeleri döndür
    if (
      !filters.search &&
      filters.priority === "all" &&
      filters.tags.length === 0
    ) {
      return lists;
    }

    // Her liste için card'ları filtrele
    return lists.map((list) => ({
      ...list,
      cards: filterCards(list.cards, filters),
    }));
  }, [lists, filters]);
};
