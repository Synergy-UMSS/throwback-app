import React, { useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import {TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import songs from '../../data/Prueba/Data';
import Connection from '../components/Connection';
import TrackPlayer, { Event, State, usePlaybackState,useProgress, useTrackPlayerEvents} from 'react-native-track-player';
import { MusicPlayerContext } from '../components/MusicPlayerContext';
import {useSearchStore} from '../store/searchStore';
import {usePlayerStore} from '../store/playerStore';
import {useConnectionGlobal} from '../helpcomponents/connectionGlobal';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from "react-native-restart";
import { useFocusEffect } from '@react-navigation/native';

let color: string[] = [
    '#C7A9D560',
    '#96ead280',
    '#FFC1D860',
]

let lastSong: { id: any; title: any; artist: any; artwork: any; url: any; } | null = null;

const Player = ({navigation}) => {
    const {clearRecentSearches, recentSearches, showHistory, currentSearch} =
    useSearchStore();
    const {setCurrentSong, currentSong} = usePlayerStore();
    const setPlayer = async () => {
        try{
            await TrackPlayer.setupPlayer();
            // quiero las canciones desde 3.5
            await TrackPlayer.add([currentSong]);
            await TrackPlayer.add(songs);
            {/*const trackList = await TrackPlayer.getQueue();*/}
            {/*console.log('*****track list', trackList);*/}
            if(isConnected){
                await TrackPlayer.play();
            }
            
        }catch(e){
            console.log('aca hay error',e)
        }
    };
    
    const playTrack = async (playState: State) => {
        const track =  await TrackPlayer.getCurrentTrack();
        if(track !== null){
            if(playState == State.Ready || playState == State.Paused && isConnected){
                await TrackPlayer.play();
            }else {
                await TrackPlayer.pause();
            }
        }
    };
    const playState: State = usePlaybackState();
    const sliderWork = useProgress(); 
    const [songIndex, setsongIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtwork, setTrackArtwork] = useState();
    const {isPlaying, setIsPlaying} = useContext(MusicPlayerContext);
    const {isConnected, setIsConnected} =  useConnectionGlobal();

    useEffect(()=>{
        playTrack();
        {/*console.log('El valor de isConnected es igual a: ',isConnected);*/}
    },[isConnected]);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          const {title, artwork, artist} = track;
          setTrackTitle(title);
          setTrackArtist(artist);
          setTrackArtwork(artwork);
          {/*console.log(currentSong.title);*/}
          await setCurrentSong(track);
        }
    });
    
    const changeValuesTrack = async () => {
        try {
            const trackIndex = await TrackPlayer.getCurrentTrack();
            const track = await TrackPlayer.getTrack(currentSong.id);
            const {title, artwork, artist} = track;
            setTrackTitle(title);
            setTrackArtist(artist);
            setTrackArtwork(artwork);
            if(isConnected){
                if (currentSong != lastSong) {
                    await TrackPlayer.skip(currentSong.id); 
               };
               await TrackPlayer.play();
               lastSong = currentSong;
            }else{
                await TrackPlayer.pause();
            }
            
            
        } catch(e) {
            console.log('Hubo un error b:', e);
        }
    };

    useEffect(() => {
        setPlayer();
    }, []);

    useEffect(() => {
        changeValuesTrack();
    }, [currentSong]);

    useEffect(() => {
        setIsPlaying(true);
    }, [isPlaying]);
                         
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: color[currentSong.id % 3],
            justifyContent:'center',
        }}>
            <TouchableOpacity style={style.flechita} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>

            <View style={style.container}>
                <View style={[style.imageWrapper, style.elevation]}> 
                    <Image 
                        source={trackArtwork || require('../assets/logo.png')}
                        style={style.musicImage}
                    />
                </View>
                <View>
                    <Text style={style.songTitle}>{trackTitle}</Text>
                    <Text style={style.songArtist}>{trackArtist}</Text>
                </View>

                <View>
                    <View style={style.songDurationMain}>
                        <Text>
                            {new Date(sliderWork.position *1000).toLocaleTimeString().substring(3,8)}
                        </Text>
                        <Text>
                            {new Date(sliderWork.duration *1000).toLocaleTimeString().substring(3,8)}
                        </Text>
                    </View>
                    <Slider
                        style={style.songSlider}
                        value = {sliderWork.position}
                        minimumValue ={0}
                        maximumValue= {sliderWork.duration}
                        thumbTintColor = 'pink'
                        minimumTrackTintColor='white'
                        maximumTrackTintColor='#FFFFFF80'
                        onSlidingComplete={isConnected? async time => {
                            await TrackPlayer.seekTo(time);
                        }: undefined}
                    />
                    
                </View>

                <View style={style.songControl}>
                    <TouchableOpacity onPress={() => playTrack(playState)}>
                        <Ionicons name={playState !== State.Playing ? "play-outline" : "pause-outline"} size={44} color="white" />
                    </TouchableOpacity>   
                </View>
                
                <Connection/>
                
            </View>
        </SafeAreaView>
    );
};

export default Player;

const style = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#96ead290',
        justifyContent:'center',
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
        fontFamily:'Acme-Regular.ttf',
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
    songDurationMain:{
        fontFamily:'Quicksand-VariableFont',
        width: 300,
        marginTop: 25,
        marginLeft:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    songControl: {
        width: 50,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flechita:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingTop:15,
    },
});