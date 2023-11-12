import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Connection from '../components/Connection';
import TrackPlayer, { Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { MusicPlayerContext } from '../components/MusicPlayerContext';
import { useSearchStore } from '../store/searchStore';
import { usePlayerStore } from '../store/playerStore';
import { useConnectionGlobal } from '../helpcomponents/connectionGlobal';
import { useControlPlayer } from '../helpcomponents/controlPlayer';
import { firebase } from '@react-native-firebase/firestore';
import { usePlaylistFavGlobal } from '../helpcomponents/playlistFGlobal';
import { usePlaylistStore } from '../store/playlistStore';

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
  const { currentPlaylistfav, setCurrentPlaylistfav } = usePlaylistFavGlobal();
  const { currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
  const [heartLikes, setHeartLikes] = useState({});
  const [heartUpdate, setHeartUpdate] = useState(false);
  const [messageA, setMessageA] = useState('');
  const [indexSongsp, setIndexSongsp] = useState({});
  const [indexCurrent, setIndexCurrent] = useState(0);

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
      setPlayerInitialized(true);
    };
    fetchDataAndInitializePlayer();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      sliderWork.position = 0;
      
      console.log(currentPlaylist.songs_p);
      console.log("llegue acaaa", indexCurrent);
      if (indexCurrent < currentPlaylist.songs_p.length) {
        const track = await TrackPlayer.getTrack(currentPlaylist.songs_p[indexCurrent]);
        const { title, artwork, artist, duration } = track;
        
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        console.log('hasta aca bien?');
        await setCurrentSong(track);
      } else {
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
    }
  });

  const repeatIcon = () => {
    if (repeatMode == 'off') {
      return 'repeat-off';
    };
    if (repeatMode == 'track') {
      return 'repeat';
    };
    if (repeatMode == 'repeat') {
      return 'repeat';
    };
  };

  const addSongPlaylistFav = async (song) => {
    const docRef = firestore().collection('playlist_fav').doc(currentPlaylistfav.id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        if (Array.isArray(data.songs_fav)) {
          if (heartLikes[song.id]) {
            data.songs_fav = data.songs_fav.filter((favSong) => favSong.id !== song.id);
          } else {
            data.songs_fav.push(song);
          }
          docRef.update({
            songs_fav: data.songs_fav
          })
            .then(() => {
              console.log('Dato cambiado con éxito');
              setHeartUpdate(!heartUpdate);
              setHeartLikes((prevHeartLikes) => ({
                ...prevHeartLikes,
                [song.id]: !heartLikes[song.id],
              }));
              setMessageA(heartLikes[song.id] ? 'Canción removida de lista de favoritos.' : 'Canción agregada a lista de favoritos.');
            })
            .catch((error) => {
              console.error('Error al actualizar el documento:', error);
            });
        } else {
          console.error('El campo songs no es un arreglo o no existe');
        }
      } else {
        console.error('No se encontró el documento');
      }
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessageA('');
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [messageA]);

  const changeRepeatMode = () => {
    if (repeatMode == 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode('track');
    };
    if (repeatMode == 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
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
      const track = await TrackPlayer.getTrack(idNumerico);
      if (track !== null) {
        const { title, artwork, artist } = track;
        setTrackTitle(title);
        setTrackArtist(artist);
        setTrackArtwork(artwork);
        if (isConnected) {
          if (currentSong !== lastSong) {
            await TrackPlayer.skip(currentSong.id);
            console.log('llego');
            
        setIndexCurrent(indexCurrent + 1);
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
    const updatedHeartLikes = {};
    if (currentPlaylistfav && currentPlaylistfav.songs_fav) {
      currentPlaylistfav.songs_fav.forEach((favSong) => {
        updatedHeartLikes[favSong.id] = true;
      });
    };
    setHeartLikes(updatedHeartLikes);
  }, [currentPlaylistfav]);

  useEffect(() => {
    const changeAndPlayTrack = async () => {
      await changeValuesTrack();
      if (isConnected) {
        setIsPlaying(true);
        await TrackPlayer.play(); // Para reproducir la nueva canción directamente y solucionar el bug de que no se reproduce al pausar
      }
    };

    if (currentSong) {
      changeAndPlayTrack();
    }
  }, [currentSong, isConnected]);
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
            thumbTintColor='white'
            minimumTrackTintColor={colorSec[currentSong.id % 3]}
            maximumTrackTintColor={colorSec[currentSong.id % 3]}
            onSlidingComplete={isConnected ? async time => {
              await TrackPlayer.seekTo(time);
            } : undefined}
          />
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
        <View style={style.songMainControl}>
          <View style={{ left: -125 }}>
            <TouchableOpacity onPress={() => addSongPlaylistFav(currentSong)}>
              <Ionicons name={heartLikes[currentSong.id] ? "heart" : "heart-outline"} size={25} color={colorSec[currentSong.id % 3]} />
            </TouchableOpacity>
          </View>
          <View style={{ right: -125 }}>
            <TouchableOpacity onPress={changeRepeatMode}>
              <MaterialCommunityIcons name={`${repeatIcon()}`} size={25} color={colorSec[currentSong.id % 3]} />
            </TouchableOpacity>
          </View>
        </View>

        {messageA &&
          <View style={style.messageHeart}>
            <Text style={{ color: 'white', textAlign: 'center' }}>{messageA}</Text>
          </View>}
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
  messageHeart: {
    position: 'absolute',
    backgroundColor: '#505050',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    bottom: 0,
  },
  songMainControl: {
    flexDirection: 'row',
    marginBottom: 10,
    top: 0,
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
