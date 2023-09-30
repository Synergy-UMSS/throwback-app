// screen to search a music with the name of the song
import React from 'react';
import {View, Text, Platform} from 'react-native';
import SearchBar from '../components/SearchBar';
const Search = () => {
  return (
    <View
      style={{
        marginTop: Platform.OS === 'ios' ? 28 : 12,
      }}>
      <SearchBar />
    </View>
  );
};
export default Search;
