import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSearchStore} from '../store/searchStore';

const Search = ({navigation}) => {
  const {clearRecentSearches, recentSearches} = useSearchStore();

  const clearSearches = () => {
    clearRecentSearches();
  };

  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 28 : 12,
      }}>
      <SearchBar />
      <TouchableOpacity
        onPress={() => {
          clearSearches();
        }}>
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
