import React, { useRef, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useSearchBox } from 'react-instantsearch-core';

export function SearchBox(props) {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  // We bypass the state update if the input is focused to avoid concurrent
  // updates when typing.
  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={inputValue}
          onChangeText={setQuery}
          placeholder="Buscar en Spotify"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderRadius: 30,  
},
  searchIcon: {
    margin: 10,
},
input: {
  flex: 1,
    height: 40,
    color: 'black',
  }
});

export default SearchBox;

