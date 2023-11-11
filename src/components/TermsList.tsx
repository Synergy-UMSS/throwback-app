import React, { useState, useRef } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

const TermsList = ({ onTermSelect }) => {
  const [selectedTerm, setSelectedTerm] = useState(null);
  const scrollViewRef = useRef(null);
  const termRefs = useRef({});

  const termsWithColors = {
    Todo: { backgroundColor: 'gray', color: 'white' },
    emo2: { backgroundColor: 'red', color: 'white' },
    emo3: { backgroundColor: 'green', color: 'white' },
    emo4: { backgroundColor: 'orange', color: 'white' },
    emo5: { backgroundColor: 'purple', color: 'white' },
    emo6: { backgroundColor: 'yellow', color: 'black' },
    emo7: { backgroundColor: 'pink', color: 'white' },
    emo8: { backgroundColor: 'brown', color: 'white' },
    emo9: { backgroundColor: 'grey', color: 'white' },
  };

  const handleTermPress = (term) => {
    setSelectedTerm(term);
    onTermSelect(term);
    if (termRefs.current[term]) {
      termRefs.current[term].measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          const screenWidth = Dimensions.get('window').width;
          const centerPosition = x - (screenWidth / 2) + (width/2);
          
          scrollViewRef.current.scrollTo({ x: centerPosition, animated: true });
        },
        error => {
          console.error('Failed to measure term layout:', error);
        }
      );
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal={true}
      contentContainerStyle={styles.scrollViewContainer}
      showsHorizontalScrollIndicator={false}
    >
      {Object.keys(termsWithColors).map((term) => (
        <TouchableOpacity
          key={term}
          ref={el => (termRefs.current[term] = el)}
          style={[
            styles.term,
            selectedTerm === term && { ...styles.selectedTerm, ...termsWithColors[term] },
          ]}
          onPress={() => handleTermPress(term)}
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
