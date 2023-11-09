import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
// const ScreenWidth = Dimensions.get('window').width;
const screenWidth = Dimensions.get('window').width;
const ImageFullWidth = ({ source }) => {
  return (
    <View>
      <Image
        source={source}
        style={styles.imagen}
        // resizeMode="cover"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imagen: {
    width: screenWidth,
    height: screenWidth * 0.47,
    resizeMode: 'contain',
    // backgroundColor:'red',
  },
});
export default ImageFullWidth;
