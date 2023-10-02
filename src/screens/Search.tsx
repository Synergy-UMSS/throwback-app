import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import { useSearchStore } from '../store/searchStore';
import SongSuggestion from '../components/SongSuggestion';
import songs  from '../../data/Prueba/Data';
const Search = ({ navigation }) => {
  const { clearRecentSearches, recentSearches, showHistory,currentSearch } = useSearchStore();

  const clearSearches = () => {
    clearRecentSearches();
  };

  const displaySearches = () => {
    if (!showHistory) return null;
    return recentSearches.map((searchQuery, index) => (
      <RecentSearchItem key={index} searchQuery={searchQuery} />
    ));
  };


  const handlePress = (paila) => {
    console.log('handlePress ' + paila);
  };
  const matching = (query, song) => {
    const { title, artist } = song;
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseTitle = title.toLowerCase();
    const lowerCaseArtist = artist.toLowerCase();
    return (
      lowerCaseTitle.includes(lowerCaseQuery) || lowerCaseArtist.includes(lowerCaseQuery)
    );
  };


  const displaySongSuggestions = () => {
    if (showHistory) return null;
    const suggests = [];
    let mimi = currentSearch;
    for(let i=0;i<songs.length;i++){
      if(matching(mimi,songs[i])){
        suggests.push(songs[i]);
      }
    }
    return (
      <View>
        {suggests.map((song, index) => (
          <SongSuggestion key={index} songData={song} onOptionPress={handlePress} />
        ))}
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
