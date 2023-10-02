import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSearchStore } from '../store/searchStore';

const RecentSearchItem = ({ searchQuery }) => {
  const { clearRecentSearches, deleteRecentSearch } = useSearchStore();
  const handleDelete = () => {
    console.log("borrar");
    deleteRecentSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.queryText}>{searchQuery}</Text>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => {
          handleDelete();
        }} 
      >
      <Feather name="x-circle" size={20} color="gray"/>
      </TouchableOpacity>
    </View>
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
  },
  queryText: {
    fontSize: 16,
    flex: 1,
    alignSelf: 'center',
  },
  deleteButton: {
    padding: 8,
  },
});

export default RecentSearchItem;
