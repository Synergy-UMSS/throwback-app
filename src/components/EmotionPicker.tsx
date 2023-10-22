import React, { useState, useRef } from 'react';
import { Image, View, FlatList, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const emociones = [
  require('../assets/emotion/1.png'),
  require('../assets/emotion/2.png'),
  require('../assets/emotion/3.png'),
  require('../assets/emotion/4.png'),
  require('../assets/emotion/5.png'),
  require('../assets/emotion/6.png'),
  require('../assets/emotion/7.png'),
  require('../assets/emotion/8.png'),
  require('../assets/emotion/9.png'),
  require('../assets/emotion/10.png'),
  require('../assets/emotion/11.png'),
  require('../assets/emotion/12.png'),
  require('../assets/emotion/13.png'),
  require('../assets/emotion/14.png'),
];

const EmotionPicker = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onEndReached = () => {
    // Handle infinite scroll by resetting to the first item
    setCurrentIndex(0);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.imagen} source={item} />
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={emociones}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.1}
      initialScrollIndex={currentIndex}
      pagingEnabled
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // Add margin or padding as needed
  },
  imagen: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default EmotionPicker;
