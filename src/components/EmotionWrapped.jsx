import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

import emo1 from '../assets/emotion/wrapped/1.png';
import emo2 from '../assets/emotion/wrapped/2.png';
import emo3 from '../assets/emotion/wrapped/3.png';
import emo4 from '../assets/emotion/wrapped/4.png';
import emo5 from '../assets/emotion/wrapped/5.png';
import emo6 from '../assets/emotion/wrapped/6.png';
import emo7 from '../assets/emotion/wrapped/7.png';
import emo8 from '../assets/emotion/wrapped/8.png';
import emo9 from '../assets/emotion/wrapped/9.png';
import emo10 from '../assets/emotion/wrapped/10.png';
import emo11 from '../assets/emotion/wrapped/11.png';
import emo12 from '../assets/emotion/wrapped/12.png';
import emo13 from '../assets/emotion/wrapped/13.png';
import emo14 from '../assets/emotion/wrapped/14.png';

const screenWidth = Dimensions.get('window').width;

const Emocion = ({ nombre }) => {
  const emociones = {
    emo1,
    emo2,
    emo3,
    emo4,
    emo5,
    emo6,
    emo7,
    emo8,
    emo9,
    emo10,
    emo11,
    emo12,
    emo13,
    emo14,
  };

  return <Image style={styles.imagen} source={emociones[nombre]} />;
};

const styles = StyleSheet.create({
  imagen: {
    width: screenWidth * 0.6,
    height: screenWidth * 0.6,
    resizeMode: 'contain',
  },
});

export default Emocion;