import React, { createContext, useState } from 'react';
import TrackPlayer from 'react-native-track-player'; 
const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);

    const playPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause(); 
        } else {
            await TrackPlayer.play(); 
        }
        setIsPlaying(prev => !prev);
    };

    return (
        <MusicPlayerContext.Provider value={{ isPlaying, setIsPlaying, currentSong, setCurrentSong, playPause }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export { MusicPlayerContext, MusicPlayerProvider };