import React, { useState, useRef, useEffect } from 'react';
import { Image, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';

import emo1 from '../assets/emotion/1.png';
import emo2 from '../assets/emotion/2.png';
import emo3 from '../assets/emotion/3.png';
import emo4 from '../assets/emotion/4.png';
import emo5 from '../assets/emotion/5.png';
import emo6 from '../assets/emotion/6.png';
import emo7 from '../assets/emotion/7.png';
import emo8 from '../assets/emotion/8.png';
import emo9 from '../assets/emotion/9.png';
import emo10 from '../assets/emotion/10.png';
import emo11 from '../assets/emotion/11.png';
import emo12 from '../assets/emotion/12.png';
import emo13 from '../assets/emotion/13.png';
import emo14 from '../assets/emotion/14.png';


const emotions = {
  emo1: { image: emo1, name: 'Feliz' },
  emo2: { image: emo2, name: 'Enojado' },
  emo3: { image: emo3, name: 'Frustrado' },
  emo4: { image: emo4, name: 'Cariñoso' },
  emo5: { image: emo5, name: 'No emotivo' },
  emo6: { image: emo6, name: 'Indeciso' },
  emo7: { image: emo7, name: 'Agradecido' },
  emo8: { image: emo8, name: 'Enamorado' },
  emo9: { image: emo9, name: 'Juguetón' },
  emo10: { image: emo10, name: 'Relajado' },
  emo11: { image: emo11, name: 'Confundido' },
  emo12: { image: emo12, name: 'Alegre' },
  emo13: { image: emo13, name: 'Triste' },
};

const EmotionPicker = ({ emotion, onEmotionChange }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(emotion);
  const [showName, setShowName] = useState(false); // Estado para controlar la visibilidad del nombre
  const [selectedEmotionName, setSelectedEmotionName] = useState(''); // Estado para almacenar el nombre
  const flatListRef = useRef(null); 

  const handleEmotionChange = (selectedEmotion, emotionName) => {
    setSelectedEmotion(selectedEmotion);
    setSelectedEmotionName(emotionName);
    setShowName(true); // Mostrar el nombre cuando se presiona la imagen
    onEmotionChange(selectedEmotion);
  };

  useEffect(() => {
    // Selecciona la emoción "emo1" cuando el componente se monta
    setSelectedEmotion("emo1");
    setSelectedEmotionName(emotions["emo1"].name);
    setShowName(true);
    onEmotionChange("emo1");
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        data={Object.keys(emotions)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleEmotionChange(item, emotions[item].name)}
          >
            <Image
              style={[
                styles.emotion,
                {
                  borderWidth: selectedEmotion === item ? 2 : 0,
                },
              ]}
              source={emotions[item].image}
            />
            {showName && selectedEmotion === item && (
              <Text style={styles.emotionName}>{selectedEmotionName}</Text>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
  },
  emotion: {
    width: 50,
    height: 50,
    marginHorizontal:5,
    marginVertical:1,
  },
  emotionName: {
    textAlign: 'center',
    fontSize: 11,
    color: 'black'
  },
});

export default EmotionPicker;