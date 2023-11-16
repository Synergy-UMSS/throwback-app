import {initializeApp} from 'firebase/app';
import firebase from '@react-native-firebase/app';
const {getAuth} = require('firebase/auth');
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  where
} from 'firebase/firestore';
import {create} from 'zustand';

const firebaseConfig = {
  apiKey: 'AIzaSyB8e_SRGTjZk6Mjjvd2s6wN7WelbKBvvOM',
  authDomain: 'synergy-umss.firebaseapp.com',
  projectId: 'synergy-umss',
  storageBucket: 'synergy-umss.appspot.com',
  messagingSenderId: '123136814804',
  appId: '1:123136814804:web:67e9d849c4778270941541',
};

const userKey = firebase.auth().currentUser?.uid;

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const historyCollectionRef = collection(db, 'history');
interface SearchStore {
  recentSearches: string[];
  currentSearch: string;
  showHistory: boolean; // Nuevo booleano para controlar la visibilidad del historial
  showSuggestions: boolean; // Nuevo booleano para controlar la visibilidad de las sugerencias
  deleteRecentSearch: (searchQuery: string) => void;
  addRecentSearch: (searchQuery: string) => void;
  clearRecentSearches: () => void;
  showHistoryTrue: () => void; // Función para alternar la visibilidad del historial
  showHistoryFalse: () => void; // Función para alternar la visibilidad del historial
  updateCurrentSearch: (searchQuery: string) => void;
  showSuggestionsTrue: () => void;
  showSuggestionsFalse: () => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  recentSearches: [],
  currentSearch: '',
  showHistory: true, // Valor inicial: historial oculto
  showSuggestions: false, // Valor inicial: sugerencias ocultas
  deleteRecentSearch: async searchQuery => {
    try {
      // Eliminar el documento correspondiente en la base de datos
      const querySnapshot = await getDocs(
        query(collection(db, 'history'), where('userKey', '==', userKey))
      );
      querySnapshot.forEach(doc => {
        const history = doc.data();
        if (history.searchQuery === searchQuery) {
          deleteDoc(doc.ref);
        }
      });

      set(state => ({
        recentSearches: state.recentSearches.filter(
          query => query !== searchQuery,
        ),
      }));
    } catch (error) {
      console.error('Error al eliminar la búsqueda:', error);
    }
  },
  addRecentSearch: searchQuery => {
    //Bug: El historial de búsquedas sobre pasa el límite de 30 canciones.
    if (searchQuery.trim() !== '') {
      set(state => {
        const updatedRecentSearches = [
          searchQuery.trim(),
          ...state.recentSearches.filter(query => query !== searchQuery.trim()),
        ];
        if (updatedRecentSearches.length > 30) {
          updatedRecentSearches.splice(30);
        }
        addDoc(historyCollectionRef, {
          searchQuery: searchQuery.trim(),
          searchDate: serverTimestamp(),
          userKey: userKey
        });
        return {
          recentSearches: updatedRecentSearches,
        };
      });
    }
  },
  clearRecentSearches: async () => {
    try {
      // Crear una consulta para obtener todos los documentos en la colección
      const querySnapshot = await getDocs(
        query(collection(db, 'history'), where('userKey', '==', userKey))
      );

      // Iterar a través de los documentos y eliminarlos
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref);
      });

      set(state => ({
        recentSearches: [],
      }));
    } catch (error) {
      console.error('Error al borrar el historial:', error);
    }
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
  },
  updateRecentSearches: async () => {
    try {
      const res: string[] = [];
  
      // Usa await para esperar a que se resuelva la promesa de getDocs
      const querySnapshot = await getDocs(query(collection(db, 'history'),where('userKey', '==', userKey), orderBy('searchDate', 'desc')));
  
      // Itera sobre los documentos a través de .docs
      querySnapshot.docs.forEach(doc => {
        const history = doc.data();
        res.push(history.searchQuery);
      });
  
      // Actualizar el estado de 'recentSearches' con las búsquedas ordenadas
      set(state => ({
        recentSearches: res,
      }));
      // Reverse res
      return res;
    } catch (error) {
      console.error('Error al obtener las búsquedas recientes:', error);
      return [];
    }
  },
}));