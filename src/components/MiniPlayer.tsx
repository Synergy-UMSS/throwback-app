import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { usePlayerStore } from '../store/playerStore';
import { MusicPlayerContext } from './MusicPlayerContext';

const MiniPlayer = () => {
    const { currentSong } = usePlayerStore();
    const musicPlayer = useContext(MusicPlayerContext);
    const isPlaying = musicPlayer.isPlaying;
    const playPause = musicPlayer.playPause;

    return (
        <View style={styles.miniPlayerContainer}>
            <View style={styles.contentRow}>
                    {currentSong.coverURL ? (
                    <Image source={{ uri: currentSong.coverURL }} style={styles.coverImage} />
                ) : (
                    <Image source={require('../assets/logo.png')} style={styles.coverImage} />
                )}
                <View style={styles.textContainer}>
                    <Text style={styles.songTitle} numberOfLines={1}>{currentSong.title}</Text>
                    <Text style={styles.songArtist} numberOfLines={1}>{currentSong.artist}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.playPauseButton} onPress={playPause}>
                <Ionicons name={isPlaying ? "pause-outline" : "play-outline"} size={30} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    miniPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', 
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 50,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coverImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 10,
        flexShrink: 1, 
    },
    songTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    songArtist: {
        color: 'white',
        fontSize: 14,
    },
    playPauseButton: {
        },
});

export default MiniPlayer;
