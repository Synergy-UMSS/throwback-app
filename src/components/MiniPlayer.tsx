import React, { useContext, useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextTicker from 'react-native-text-ticker';
import { usePlayerStore } from '../store/playerStore';
import { MusicPlayerContext } from './MusicPlayerContext';

let colorSec: string[] = [
  '#64556B',
  '#4B7569',
  '#80616C',
];

const MiniPlayer = ({ navigation }) => {
    const { currentSong } = usePlayerStore();
    const musicPlayer = useContext(MusicPlayerContext);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

    // para que se actualice cuando se reproduce una cancion 
    useEffect(() => {
        if (currentSong && musicPlayer.isPlaying) {
            setHasStartedPlaying(true);
        }
    }, [currentSong, musicPlayer.isPlaying]);

    const playPause = () => {
        if (currentSong) {
            musicPlayer.playPause();
            setHasStartedPlaying(true); 
        }
    };

    const handlePressPlayer = () => {
        navigation.navigate('Player', { songData: currentSong, playlistFlow: true });
    };

    // bug solucionado, ya no se muestra el miniplayer cuando no se esta reproduciendo una cancion xd
    if (!currentSong || !hasStartedPlaying) {
        return null;
    }

    return (
        <View style={styles.miniPlayerContainer}>
            <TouchableOpacity style={styles.contentRow} onPress={handlePressPlayer}>
                {currentSong.artwork && isValidURL(currentSong.artwork) ? (
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
                <Ionicons name={musicPlayer.isPlaying ? "pause-outline" : "play-outline"} size={30} color={colorSec[currentSong.id % 3]} />
            </TouchableOpacity>
        </View>
    );
};


const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

const styles = StyleSheet.create({
    miniPlayerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(149,228,206,220)',
        paddingHorizontal: 15,
        paddingVertical: 7,
        position: 'absolute',
        bottom: 50,
        borderRadius: 7,
        marginRight: 4,
        marginLeft: 4,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    coverImage: {
        width: 43,
        height: 43,
        borderRadius: 6,
    },
    textContainer: {
        marginLeft: 10,
        flexShrink: 1,
        maxWidth: '80%',  
    },
    songTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 12,
    },
    songArtist: {
        color: 'black',
        fontSize: 10,
    },
});

export default MiniPlayer;
