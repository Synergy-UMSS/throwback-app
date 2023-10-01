import create from 'zustand';

interface SearchStore {
  recentSearches: string[];
  addRecentSearch: (searchQuery: string) => void;
  clearRecentSearches: () => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  recentSearches: [],
  addRecentSearch: searchQuery => {
    set(state => ({
      recentSearches: [...state.recentSearches, searchQuery],
    }));
  },
  clearRecentSearches: () => {
    set(state => ({
      recentSearches: [],
    }));
  },
}));
