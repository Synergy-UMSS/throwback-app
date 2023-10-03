//<Image source={{ uri: 'default_image_uri_here' }} style={styles.listItemImage} /> {/* Asume una imagen por defecto */}

import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ItemSong = ({ song, artist, onPlay, imageUri, memoriaId }) => {
  return (
      <TouchableOpacity style={styles.listItem} onPress={onPlay}>
          <Image source={typeof imageUri === 'string' ? { uri: imageUri } : imageUri} style={styles.listItemImage} />
          <View style={styles.textContainer}>
              <Text style={styles.songTitle}>{song}</Text>
              <Text style={styles.songArtist}>{artist}</Text>
          </View>
      </TouchableOpacity>
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
        elevation:8
    },
    listItemImage: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 10,
    },
    textContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    songTitle: {
        fontSize: 18,
        color: 'black',
    },
    songArtist: {
        fontSize: 14,
        color:'#5C5C5C',
    },
});

export default ItemSong;
