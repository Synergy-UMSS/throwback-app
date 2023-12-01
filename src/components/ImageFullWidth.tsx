import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ImageFullWidth = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  image: {
    width: screenWidth,
    height: screenWidth * 0.3,
    marginTop: 20,
    marginBottom: 10,
    resizeMode: 'contain',
  },
});

export default ImageFullWidth;

