import create from 'zustand';

interface SearchStore {
  recentSearches: string[];
  currentSearch: string;
  showHistory: true; // Nuevo booleano para controlar la visibilidad del historial
  deleteRecentSearch: (searchQuery: string) => void;
  addRecentSearch: (searchQuery: string) => void;
  clearRecentSearches: () => void;
  showHistoryTrue: () => void; // Función para alternar la visibilidad del historial
  showHistoryFalse: () => void; // Función para alternar la visibilidad del historial
}

export const useSearchStore = create<SearchStore>(set => ({
  recentSearches: [],
  showHistory: false, // Valor inicial: historial oculto
  deleteRecentSearch: searchQuery => {
    set(state => ({
      recentSearches: state.recentSearches.filter(
        query => query !== searchQuery,
      ),
    }));
  },
  addRecentSearch: searchQuery => {
    // Primero elimino duplicados de searchQuery en el array
    set(state => ({
      recentSearches: [searchQuery, ...state.recentSearches],
    }));
  },
  clearRecentSearches: () => {
    set(state => ({
      recentSearches: [],
    }));
  },
  showHistoryTrue: () => {
    set(state => ({
      showHistory: true,
    }));
  },
  showHistoryFalse: () => {
    set(state => ({
      showHistory: false,
    }));
  },
  updateCurrentSearch: searchQuery => {
    set(state => ({
      currentSearch: searchQuery,
    }));
  }
}));
