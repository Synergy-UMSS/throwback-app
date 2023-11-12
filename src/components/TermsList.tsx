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

  const emotions = {
    Todo: { name: 'Todo', backgroundColor: 'black', textColor: 'white' },
    emo1: { name: 'Feliz', backgroundColor: '#F6EA7E', textColor: 'black' },
    emo13: { name: 'Triste', backgroundColor:  '#9DE0D2', textColor: 'black' },
    emo4: { name: 'Cariñoso', backgroundColor:  '#FFC1D8', textColor: 'black' },
    emo12: { name: 'Alegre', backgroundColor:  '#F0CC8B', textColor: 'black' },
    emo8: { name: 'Enamorado', backgroundColor:  '#FBBAA4', textColor: 'black' },
    emo10: { name: 'Relajado', backgroundColor:  '#9DE0D2', textColor: 'black' },
    emo7: { name: 'Agradecido', backgroundColor:  '#FFC1D8', textColor: 'black' },
    emo2: { name: 'Enojado',backgroundColor: '#FBBAA4', textColor: 'black' },
    emo3: { name: 'Frustrado', backgroundColor: '#C7A9D5', textColor: 'black' },
    emo11: { name: 'Confundido', backgroundColor:  '#B6BFD4', textColor: 'black' },
    emo5: { name: 'No emotivo', backgroundColor:  '#F0CC8B', textColor: 'black' },
    emo6: { name: 'Indeciso', backgroundColor:  '#B6BFD4', textColor: 'black' },
    emo9: { name: 'Juguetón', backgroundColor:  '#F6EA7E', textColor: 'black' },
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
      {Object.entries(emotions).map(([termKey, { name, backgroundColor, textColor }]) => (
        <TouchableOpacity
          key={termKey}
          ref={el => (termRefs.current[termKey] = el)}
          style={[
            styles.term,
            selectedTerm === termKey && { backgroundColor, borderColor: backgroundColor, paddingHorizontal: 20,},
          ]}
          onPress={() => handleTermPress(termKey)}
        >
          <Text
            style={[
              styles.text,
              selectedTerm === termKey && { color: textColor, fontWeight: 'bold' },
            ]}
          >
            {name}
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
