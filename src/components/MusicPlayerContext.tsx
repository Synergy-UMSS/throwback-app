import React, { createContext, useState, useEffect } from 'react';
import TrackPlayer, { useTrackPlayerEvents, Event } from 'react-native-track-player';

const MusicPlayerContext = createContext({
  isPlaying: false,
  setIsPlaying: () => {},
  currentSong: null,
  setCurrentSong: () => {},
  playPause: () => {}
});

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

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentSong({
        id: track.id,
        title: track.title,
        artist: track.artist,
        artwork: track.artwork,
        url: track.url
      });
    }
  });

  useEffect(() => {
    const initializeTrackPlayer = async () => {
    // Inicializa TrackPlayer o realiza cualquier configuración necesaria
  };
  initializeTrackPlayer();
    return () => {
      // Limpieza (si es necesaria) cuando el componente se desmonta
    };
  }, []);

  return (
    <MusicPlayerContext.Provider value={{ isPlaying, setIsPlaying, currentSong, setCurrentSong, playPause }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };
