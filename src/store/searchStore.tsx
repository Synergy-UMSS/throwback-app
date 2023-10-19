import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { create } from 'zustand';

const firebaseConfig = {
  apiKey: "AIzaSyB8e_SRGTjZk6Mjjvd2s6wN7WelbKBvvOM",
  authDomain: "synergy-umss.firebaseapp.com",
  projectId: "synergy-umss",
  storageBucket: "synergy-umss.appspot.com",
  messagingSenderId: "123136814804",
  appId: "1:123136814804:web:67e9d849c4778270941541"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const historyCollectionRef = collection(db, 'history');
interface SearchStore {
  recentSearches: string[];
  currentSearch: string;
  showHistory: boolean;    // Nuevo booleano para controlar la visibilidad del historial
  showSuggestions: boolean;  // Nuevo booleano para controlar la visibilidad de las sugerencias
  deleteRecentSearch: (searchQuery: string) => void;
  addRecentSearch: (searchQuery: string) => void;
  clearRecentSearches: () => void;
  showHistoryTrue: () => void;   // Función para alternar la visibilidad del historial
  showHistoryFalse: () => void;  // Función para alternar la visibilidad del historial
  updateCurrentSearch: (searchQuery: string) => void;
  showSuggestionsTrue: () => void;
  showSuggestionsFalse: () => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  recentSearches: [],
  currentSearch: '',
  showHistory: true,  // Valor inicial: historial oculto
  showSuggestions: false,   // Valor inicial: sugerencias ocultas
  deleteRecentSearch: searchQuery => {
    set(state => ({
      recentSearches: state.recentSearches.filter(query => query !== searchQuery),
    }));
  },
  addRecentSearch: searchQuery => {  //Bug: El historial de búsquedas sobre pasa el límite de 30 canciones.
    if (searchQuery.trim() !== '') {
      set(state => {
        const updatedRecentSearches = [
          searchQuery.trim(),
          ...state.recentSearches.filter(query => query !== searchQuery.trim())
        ];
        if (updatedRecentSearches.length > 30) {
          updatedRecentSearches.splice(30);
        }
        addDoc(historyCollectionRef, {
          searchQuery: searchQuery.trim(),
          searchDate: serverTimestamp()
        });
        return {
          recentSearches: updatedRecentSearches,
        };
      });
    }
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
  },
  showSuggestionsTrue: () => {
    set(state => ({
      showSuggestions: true,
    }));
  },
  showSuggestionsFalse: () => {
    set(state => ({
      showSuggestions: false,
    }));
  }
}));
