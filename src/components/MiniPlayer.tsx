import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextTicker from 'react-native-text-ticker';
import { usePlayerStore } from '../store/playerStore';
import { MusicPlayerContext } from './MusicPlayerContext';

const MiniPlayer = ({ navigation }) => {
    const { currentSong } = usePlayerStore();
    const musicPlayer = useContext(MusicPlayerContext);
    const isPlaying = musicPlayer.isPlaying;
    const playPause = musicPlayer.playPause;

    const isValidURL = (url) => {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handlePressPlayer = () => {
        navigation.navigate('Player', { songData: currentSong });
    };

    // Si no hay canción actual o la música no está en reproducción, no renderizar el MiniPlayer.
    if (!currentSong || !isPlaying) {
        return null;
    }

    return (
        <View style={styles.miniPlayerContainer}>
            <TouchableOpacity style={styles.contentRow} onPress={handlePressPlayer}>
                {isValidURL(currentSong.artwork) ? (
                    <Image source={{ uri: currentSong.artwork }} style={styles.coverImage} />
                ) : (
                    <Image source={require('../assets/logo.png')} style={styles.coverImage} />
                )}
                <View style={styles.textContainer}>
                    <TextTicker
                        style={styles.songTitle}
                        duration={15000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={1000}
                    >
                        {currentSong.title}
                    </TextTicker>
                    <TextTicker
                        style={styles.songArtist}
                        duration={15000}
                        loop
                        bounce
                        repeatSpacer={50}
                        marqueeDelay={3000}
                    >
                        {currentSong.artist}
                    </TextTicker>
                </View>
            </TouchableOpacity>
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
        backgroundColor: 'rgba(149,228,206,0.7)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 30,
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 50,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    coverImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textContainer: {
        marginLeft: 10,
        flexShrink: 1,
        maxWidth: '80%',  
    },
    songTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 14,
    },
    songArtist: {
        color: 'black',
        fontSize: 12,
    },
    playPauseButton: {
        width: 40,
        alignItems: 'center',
    },
});

export default MiniPlayer;
