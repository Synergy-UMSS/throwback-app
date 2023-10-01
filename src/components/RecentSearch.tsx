import React, { useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Search = ({ navigation }) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [shouldRenderRecentSearches, setShouldRenderRecentSearches] = useState(true);

  useEffect(() => {
    // Función para cargar las búsquedas recientes desde AsyncStorage
    const loadRecentSearches = async () => {
      try {
        const searches = await AsyncStorage.getItem('recentSearches');
        if (searches !== null) {
          const parsedSearches = JSON.parse(searches);
          setRecentSearches(parsedSearches);
        }
      } catch (error) {
        console.error('Error al cargar las búsquedas recientes:', error);
      }
    };

    // Cargar las búsquedas recientes al abrir la pantalla
    loadRecentSearches();
  }, []);

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem('busquedasRecientes');
      console.log('Búsquedas recientes eliminadas');
      setRecentSearches([]); // Limpia el estado para que las búsquedas desaparezcan
      setShouldRenderRecentSearches(false); // Desactiva el renderizado de las búsquedas recientes
    } catch (error) {
      console.error('Error al eliminar las búsquedas recientes:', error);
    }
  };

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 28 : 12,
      }}
    >
      <SearchBar />
      <Text>Busquedas Recientes ({recentSearches.length})</Text>
      <TouchableOpacity onPress={clearRecentSearches}>
        <Text>Limpiar</Text>
      </TouchableOpacity>
      {shouldRenderRecentSearches &&
        recentSearches.map((searchQuery, index) => (
          <RecentSearchItem key={index} searchQuery={searchQuery} />
        ))}
      <MiniPlayer navigation={navigation} />
    </View>
  );
};

export default Search;
