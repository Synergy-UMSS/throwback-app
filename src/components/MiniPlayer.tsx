import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MusicPlayerContext } from '../components/MusicPlayerContext';
import TrackPlayer, { usePlaybackState, State } from 'react-native-track-player';

const MiniPlayer = ({ navigation }) => {
  const { isPlaying, playPause, currentSong } = useContext(MusicPlayerContext);

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Player')}>
      <Image
        source={
          currentSong && currentSong.coverURL
            ? { uri: currentSong.coverURL }
            : require('../assets/logo.png')
        }
        style={styles.coverImage}
      />
      <View style={styles.songDetails}>
        <Text>{currentSong ? currentSong.title : 'Desconocido'}</Text>
        <Text>{currentSong ? currentSong.artist : 'Desconocido'}</Text>
      </View>
      <TouchableOpacity onPress={playPause} style={styles.playPauseButton}>
        <Ionicons
          name={isPlaying ? 'pause-outline' : 'play-outline'}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#96EAD2',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 10,
  },
  coverImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  songDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  playPauseButton: {
    padding: 10, // Esto mejora la experiencia táctil
  },
});

export default MiniPlayer;
