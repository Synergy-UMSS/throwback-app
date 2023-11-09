import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Connection from '../components/Connection';
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { MusicPlayerContext } from '../components/MusicPlayerContext';
import { useSearchStore } from '../store/searchStore';
import { usePlayerStore } from '../store/playerStore';
import { useConnectionGlobal } from '../helpcomponents/connectionGlobal';
import { useControlPlayer } from '../helpcomponents/controlPlayer';
import { firebase } from '@react-native-firebase/firestore';

let color: string[] = [
  '#C7A9D560',
  '#96ead280',
  '#FFC1D860',
];
let colorSec: string[] = [
  '#64556B',
  '#4B7569',
  '#80616C',
];


let lastSong: { id: any; title: any; artist: any; artwork: any; url: any; } | null = null;

const tracks = [];

const Player = ({ navigation, route }) => {
  const { songData, playlistFlow } = route.params;
  const db = firebase.firestore();
  const songsRef = db.collection('songs');
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const { clearRecentSearches, recentSearches, showHistory, currentSearch } = useSearchStore();
  const { setCurrentSong, currentSong } = usePlayerStore();
  const playState: State = usePlaybackState();
  const sliderWork = useProgress();
  const [repeatMode, setRepeatMode] = useState('off');
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork, setTrackArtwork] = useState();
  const { isPlaying, setIsPlaying } = useContext(MusicPlayerContext);
  const { isConnected } = useConnectionGlobal();
  const { isPaused, setIsPaused } = useControlPlayer();

  const setPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add([currentSong]);
      tracks.sort((a, b) => a.id - b.id);
      const tracksTop = tracks.map(song => ({
        ...song,
        id: Number(song.id)
      }));
      await TrackPlayer.add(tracksTop);
      let indexArb = Math.floor(Math.random() * (tracks.length - 1));
      await TrackPlayer.add([tracks[indexArb]]);
      if (isConnected) {
        await TrackPlayer.play();
      }
      changeValuesTrack();
    } catch (e) {
      console.log('Error en setupPlayer:', e);
    }
  };

  const playTrack = async (playState: State) => {
    try {
      const track = await TrackPlayer.getCurrentTrack();
      if (track !== null) {
        if (playState === State.Ready || playState === State.Paused && isConnected) {
          await TrackPlayer.play();
          setIsPaused(false);
        } else {
          await TrackPlayer.pause();
          setIsPaused(true);
        }
      }
    } catch (e) {
      console.log('Error en playTrack:', e);
    }
  };

  const fetchSongs = async () => {
    try {
      const querySnapshot = await songsRef.get();
      const songs1 = [];
      querySnapshot.forEach((doc) => {
        const song = doc.data();
        songs1.push(song);
      });
      songs1.forEach((song, index) => {
        const track = {
          id: parseInt(song.id),
          url: song.songURL,
          title: song.title,
          artist: song.artist,
          artwork: song.coverURL,
        };
        tracks.push(track);
      });
      setPlayer();
    } catch (e) {
      console.error('Error al obtener las canciones:', e);
    }
  };

  useEffect(() => {
    const fetchDataAndInitializePlayer = async () => {
      await fetchSongs();
      await setPlayer();
      console.log('Player initialized:', playerInitialized);
      setPlayerInitialized(true);
    };
    fetchDataAndInitializePlayer();
  }, []);

  useEffect(() => {
    playTrack();
  }, [isConnected]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      //solucion a bug del bug Dx para que no se guarde la anterior duracion de la cancion
      sliderWork.position = 0;
      if (event.nextTrack !== null) {
        const idNumerico = parseInt(currentSong.id);
        const track = await TrackPlayer.getTrack(parseInt(event.nextTrack));  //cambiara, para el azar no
        const { title, artwork, artist } = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        await setCurrentSong(track);
      }
    }
  });

  const repeatIcon = () => {
    if(repeatMode == 'off'){
      return 'repeat-off';
    };
    if(repeatMode == 'track'){
      return 'repeat-once';
    };
    if(repeatMode == 'repeat'){
      return 'repeat';
    };
  };

  const changeRepeatMode = () => {
    if(repeatMode == 'off'){
      setRepeatMode('track');
    };
    if(repeatMode == 'track'){
      setRepeatMode('repeat');
    };
    if(repeatMode == 'repeat'){
      setRepeatMode('off');
    };
  };

  const skipTo = async trackId => {
    await TrackPlayer.skipToNext();
  };

  const previousTo = async trackId => {
    await TrackPlayer.skipToPrevious();
  }
  const changeValuesTrack = async () => {
    try {
      const trackIndex = await TrackPlayer.getCurrentTrack();
      const idNumerico = parseInt(currentSong.id);
      console.log(idNumerico);
      const track = await TrackPlayer.getTrack(idNumerico);

      console.log('banderitaaaa', track);
      if (track !== null) {
        const { title, artwork, artist } = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        if (isConnected) {
          if (currentSong !== lastSong) {
            await TrackPlayer.skip(currentSong.id);
            console.log('llego');
          };
          if (!isPaused) {
            await TrackPlayer.play();
            setIsPaused(false);
          }
          lastSong = currentSong;
        } else {
          await TrackPlayer.pause();
          setIsPaused(true);
        }
      }
    } catch (e) {
      console.log('Error en changeValuesTrack:', e);
    }
  };

  useEffect(() => {
    changeValuesTrack();
    console.log('currentSong', currentSong);
  }, [currentSong, playlistFlow]);

  useEffect(() => {
    setIsPlaying(true);
  }, [isPlaying]);

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: color[currentSong.id % 3],
      justifyContent: 'center',
    }}>
      <TouchableOpacity style={style.flechita} onPress={() => navigation.goBack()}>
        <Ionicons style={{ color: colorSec[currentSong.id % 3] }} name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <View style={style.container}>
        <View style={[style.imageWrapper, style.elevation]}>
          {trackArtwork ? (
            typeof trackArtwork === 'number' ? (
              <Image source={trackArtwork} style={style.musicImage} />
            ) : (
              <Image source={{ uri: trackArtwork }} style={style.musicImage} />
            )
          ) : (
            <Image source={require('../assets/logo.png')} style={style.musicImage} />
          )}
        </View>
        <View>
          <Text style={style.songTitle}>{trackTitle}</Text>
          <Text style={style.songArtist}>{trackArtist}</Text>
        </View>

        <View>
          <View style={style.songDurationMain}>
            <Text style={style.songTimer}>
              {new Date(sliderWork.position * 1000).toLocaleTimeString().substring(3, 8)}
            </Text>
            <Text style={style.songTimer}>
              {new Date(sliderWork.duration * 1000).toLocaleTimeString().substring(3, 8)}
            </Text>
          </View>
          <Slider
            style={style.songSlider}
            value={sliderWork.position}
            minimumValue={0}
            maximumValue={sliderWork.duration}
            thumbTintColor= 'white'
            minimumTrackTintColor={colorSec[currentSong.id % 3]}
            maximumTrackTintColor={colorSec[currentSong.id % 3]}
            onSlidingComplete={isConnected ? async time => {
              await TrackPlayer.seekTo(time);
            } : undefined}
          />
        </View>

        <View style={[style.songMainControl, { left: 45 }]}>
          <TouchableOpacity onPress={() => playTrack(playState)}>
            <Ionicons name={playState !== State.Playing ? "heart" : "heart-outline"} size={25} color={colorSec[currentSong.id % 3]} />
          </TouchableOpacity>
        </View>
        <View style={style.songControl}>
          <TouchableOpacity onPress={() => previousTo()}>
            <Ionicons name="play-skip-back-outline" size={35} color={colorSec[currentSong.id % 3]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => playTrack(playState)}>
            <Ionicons name={playState !== State.Playing ? "play-outline" : "pause-outline"} size={50} color={colorSec[currentSong.id % 3]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => skipTo(currentSong.id)}>
            <Ionicons name="play-skip-forward-outline" size={35} color={colorSec[currentSong.id % 3]} />
          </TouchableOpacity>
        </View>
        <View style={[style.songMainControl, { right: 45 }]}>
          <TouchableOpacity onPress={() => skipTo(currentSong.id)}>
            <MaterialCommunityIcons name="" size={25} color={colorSec[currentSong.id % 3]} />
          </TouchableOpacity>
        </View>

        <Connection />
      </View>
    </SafeAreaView>
  );
};

export default Player;

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#96ead290',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginBottom: 25,
  },
  musicImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
  },
  elevation: {
    elevation: 5,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  songTitle: {
    fontFamily: 'Acme-Regular.ttf',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  songArtist: {
    fontFamily: 'ABeeZee-Italic',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '400',
    textAlign: 'center',
    color: 'black',
  },
  songSlider: {
    width: 350,
    height: 30,
    flexDirection: 'row',
  },
  songTimer: {
    color: '#3D3939',
  },
  songDurationMain: {
    fontFamily: 'Quicksand-VariableFont',
    width: 300,
    marginTop: 25,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  songMainControl: {
    position: 'absolute',
    paddingBottom: 10,
    zIndex: 1,
    bottom: 80,
  },
  songControl: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  flechita: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 15,
    paddingTop: 15,
  },
});
