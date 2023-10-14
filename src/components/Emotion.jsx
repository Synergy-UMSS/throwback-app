import React from 'react';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

import happy from '../assets/emotion/emo01.png';
import no_trouble from '../assets/emotion/emo02.png';
import angry from '../assets/emotion/emo03.png';
import worried from '../assets/emotion/emo04.png';
import genial from '../assets/emotion/emo05.png';
import tired from '../assets/emotion/emo06.png';
import sad from '../assets/emotion/emo07.png';
import leisurely from '../assets/emotion/emo08.png';
import confused from '../assets/emotion/emo09.png';
import speechless from '../assets/emotion/emo10.png';
import pluff from '../assets/emotion/emo11.png';

const screenWidth = Dimensions.get('window').width;
const Emocion = ({ nombre }) => {
    const emociones = {
        happy,
        no_trouble,
        angry,
        worried,
        genial,
        tired,
        sad,
        leisurely,
        confused,
        speechless,
        pluff,
    };
    return <Image 
    style={styles.imagen}
    source={emociones[nombre]}
  />
};

const styles = StyleSheet.create({
    imagen: {
      width: screenWidth * 0.2,
      height: screenWidth * 0.2, // control
      resizeMode: 'contain',
    //   elevation:10,
    //   backgroundColor:'red',
    //   marginRight:10,
    //   marginLeft:10,
    },
  });
export default Emocion;
