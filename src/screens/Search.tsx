import React, {useEffect, useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import {useSearchStore} from '../store/searchStore';

const Search = ({navigation}) => {
  const {clearRecentSearches, recentSearches, showHistory} = useSearchStore();

  const clearSearches = () => {
    clearRecentSearches();
  };

  const displaySearches = () => {
    if (!showHistory) return null;
    return recentSearches.map((searchQuery, index) => (
      <RecentSearchItem key={index} searchQuery={searchQuery} />
    ));
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 28 : 12,
        position: 'relative', // Agrega esta propiedad
      }}>
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
        }}>
        <TouchableOpacity
          onPress={() => {
            clearSearches();
          }}>
          <Text>Limpiar</Text>
        </TouchableOpacity>
      </View>
      {displaySearches()}
      <MiniPlayer navigation={navigation} />
    </View>
  );
};

export default Search;
