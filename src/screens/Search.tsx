import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import { useSearchStore } from '../store/searchStore';
import SongSuggestion from '../components/SongSuggestion';

const Search = ({ navigation }) => {
  const { clearRecentSearches, recentSearches, showHistory } = useSearchStore();

  const clearSearches = () => {
    clearRecentSearches();
  };

  const displaySearches = () => {
    if (!showHistory) return null;
    return recentSearches.map((searchQuery, index) => (
      <RecentSearchItem key={index} searchQuery={searchQuery} />
    ));
  };

  const cancion = {
    id: '1',
    imageSource: null,
    songName: 'Melodía de Dios',
    artistName: 'Tan Bionica',
  };
  const cancion2 = {
    id: '2',
    imageSource: null,
    songName: 'Somewhere Only We Know',
    artistName: 'Keane',
  };

  const handlePress = (paila) => {
    console.log('handlePress ' + paila);
  };

  const displaySongSuggestions = () => {
    if (showHistory) return null;
    return (
      <View>
        <SongSuggestion songData={cancion} onOptionPress={handlePress} /> 
        <SongSuggestion songData={cancion2} onOptionPress={handlePress} />
      </View>
    );
  };


  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 28 : 12,
        position: 'relative', // Agrega esta propiedad
      }}
    >
      <SearchBar
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{
          alignItems: 'flex-end',
          paddingRight: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            clearSearches();
          }}
        >

          {showHistory && <Text>Limpiar</Text>}
        </TouchableOpacity>
      </View>
      {displaySongSuggestions()}
      {displaySearches()}
      <MiniPlayer navigation={navigation} />
    </View>
  );
};

export default Search;
