import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import {TouchEventType} from 'react-native-gesture-handler/lib/typescript/TouchEventType';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Search = ({navigation}) => {
  const [recentSearches, setRecentSearches] = useState([]);

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

  // Función para actualizar la cantidad de búsquedas recientes
  const updateRecentSearches = async () => {
    console.log('Actualizando búsquedas recientes...');
    try {
      const searches = await AsyncStorage.getItem('busquedasRecientes');
      if (searches !== null) {
        const parsedSearches = JSON.parse(searches);
        setRecentSearches(parsedSearches);
      }
    } catch (error) {
      console.error('Error al cargar las búsquedas recientes:', error);
    }
  };

  

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 28 : 12,
      }}>
      <SearchBar updateRecentSearches={updateRecentSearches} />
      <Text>Busquedas Recientes ({recentSearches.length})</Text>
      <TouchableOpacity>
        <Text>Limpiar</Text>
      </TouchableOpacity>
      {recentSearches.map((searchQuery, index) => (
        <RecentSearchItem key={index} searchQuery={searchQuery} />
      ))}
      <MiniPlayer navigation={navigation} />
    </View>
  );
};

export default Search;
