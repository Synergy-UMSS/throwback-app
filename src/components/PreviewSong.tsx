//<Image source={{ uri: 'default_image_uri_here' }} style={styles.listItemImage} /> {/* Asume una imagen por defecto */}

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TextTicker from 'react-native-text-ticker';

const ItemSong = ({ song, artist, onPlay, imageUri, memoriaId }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPlay}>
      <Image
        source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri}
        style={styles.listItemImage}
      />
      <View style={styles.textContainer}>
        {renderTextWithTicker(song, styles.songTitle)}
        {renderTextWithTicker(artist, styles.songArtist)}
      </View>
    </TouchableOpacity>
  );
};

const renderTextWithTicker = (text, style) => {
  const isLongText = typeof text !== 'undefined' && text.length > 40;

  return isLongText ? (
    <TextTicker
      style={[style, styles.ticker]}
      scrollSpeed={15}
      loop
      repeatSpacer={50}
      marqueeDelay={1000}
    >
      {text}
    </TextTicker>
  ) : (
    <Text style={style}>{text}</Text>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 9,
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    elevation: 8,
  },
  listItemImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  songTitle: {
    fontSize: 18,
    color: 'black',
  },
  songArtist: {
    fontSize: 14,
    color: '#5C5C5C',
  },
  ticker: {
    scrollSpeed: 15,
    loop: true,
    repeatSpacer: 50,
    marqueeDelay: 1000,
  },
});

export default ItemSong;
