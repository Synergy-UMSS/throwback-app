import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSearchStore } from '../store/searchStore';

const RecentSearchItem = ({ searchQuery }) => {
  const {
    clearRecentSearches,
    deleteRecentSearch,
    showHistory,
    showHistoryTrue,
    showHistoryFalse,
    updateCurrentSearch,
  } = useSearchStore();

  const handleDelete = () => {
    console.log('borrar');
    deleteRecentSearch(searchQuery);
  };

  const handlePress = () => {
    console.log('presionado ' + searchQuery);
    showHistoryFalse();
    updateCurrentSearch(searchQuery);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.queryText}>{searchQuery}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}>
          <Feather name="x-circle" size={20} color="gray" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    height: 40,
    borderRadius: 10,
  },
  queryText: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
    color: '#777',
    marginLeft: 20,
  },
  deleteButton: {
    padding: 8,
  },
});

export default RecentSearchItem;
