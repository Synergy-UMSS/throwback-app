import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TermsList = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  const termsWithColors = {
    Todo: { backgroundColor: 'blue', color: 'white' },
    Bedroom: { backgroundColor: 'red', color: 'white' },
    Bsdjix: { backgroundColor: 'green', color: 'white' },
    Bedsidjs: { backgroundColor: 'orange', color: 'white' },
    Bsijsd: { backgroundColor: 'purple', color: 'white' },
    'Living Room': { backgroundColor: 'yellow', color: 'black' },
    Bathroom: { backgroundColor: 'pink', color: 'white' },
    Kitchen: { backgroundColor: 'brown', color: 'white' },
    'Guest Room': { backgroundColor: 'grey', color: 'white' },
  };

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollViewContainer}
      showsHorizontalScrollIndicator={false}
    >
      {Object.keys(termsWithColors).map((term) => (
        <TouchableOpacity
          key={term}
          style={[
            styles.term,
            selectedTerm === term && { ...styles.selectedTerm, ...termsWithColors[term] },
          ]}
          onPress={() => setSelectedTerm(term)}
        >
          <Text
            style={[
              styles.text,
              selectedTerm === term && { ...styles.selectedText, color: termsWithColors[term].color },
            ]}
          >
            {term}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 5,
    marginHorizontal: 10,
    backgroundColor: '#fcf4e7',
  },
  term: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 5,
  },
  selectedTerm: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  text: {
    fontSize: 15,
    color: 'gray',
  },
  selectedText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TermsList;
