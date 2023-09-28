import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ItemSong = ({ song, artist, onPlay }) => {
  return (
    <TouchableOpacity style={styles.songContainer} onPress={onPlay}>
      <Text style={styles.songTitle}>{song}</Text>
      <Text style={styles.songArtist}>{artist}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songTitle: {
    fontSize: 16,
  },
  songArtist: {
    fontSize: 14,
    color: 'grey',
  },
});

export default ItemSong;
