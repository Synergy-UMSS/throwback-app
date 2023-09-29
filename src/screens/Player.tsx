import React, { useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { SafeAreaView, useSafeAreaFrame } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import {TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import songs from '../../data/Prueba/Data';
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState,useProgress, useTrackPlayerEvents} from 'react-native-track-player';

const setPlayer = async () => {
    try{
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(songs);
        const trackList = await TrackPlayer.getQueue();
        console.log('*****track list', trackList);
    }catch(e){
        console.log('aca hay error',e)
    }
};


const playTrack = async (playState: State) => {
    console.log('-------------playState:', playState);
    const track =  await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(track); 
    console.log('el track es:', trackObject);
    trackAux = trackObject;
    if(track !== null ){
        if(playState == State.Ready || playState == State.Paused){
            await TrackPlayer.play();
        }else {
            await TrackPlayer.pause();
        }
    }
};


const Player = () => {
    const playState: State = usePlaybackState();
    const sliderWork = useProgress(); 
    const [songIndex, setsongIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtwork, setTrackArtwork] = useState();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
          const track = await TrackPlayer.getTrack(event.nextTrack);
          const {title, artwork, artist} = track;
          setTrackTitle(title);
          setTrackArtist(artist);
          setTrackArtwork(artwork);
        }
    });

    useEffect(() => {
        setPlayer();
        const index = 0;
        setsongIndex(index);
    }, []);


    return (
        <SafeAreaView style={style.container}>
            <View style={style.maincontainer}>
                <View style={[style.imageWrapper, style.elevation]}> 
                    <Image 
                        source={trackArtwork}
                        style={style.musicImage}
                    />
                </View>
                <View>
                    <Text style={style.songTitle}>{trackTitle}</Text>
                    <Text style={style.songArtist}>{trackArtist}</Text>
                </View>

                <View>
                    <View style={style.songDurationMain}>
                        <Text style={style.songDuration}>
                            {new Date(sliderWork.position *1000).toLocaleTimeString().substring(3,8)}
                        </Text>
                        <Text style={style.songDuration}>
                            {new Date(sliderWork.duration *1000).toLocaleTimeString().substring(3,8)}
                        </Text>
                    </View>
                    <Slider
                        style={style.songSlider}
                        value = {sliderWork.position}
                        minimumValue ={0}
                        maximumValue= {sliderWork.duration}
                        thumbTintColor = 'pink'
                        minimumTrackTintColor='black'
                        maximumTrackTintColor='white'
                        onSlidingComplete={async time => {
                            await TrackPlayer.seekTo(time);
                        }}
                    />
                </View>

                <View style={style.songControl}>
                     

                    <TouchableOpacity onPress={() => playTrack(playState)}>
                        <Ionicons name={playState !== State.Playing ? "play-outline" : "pause-outline"} size={44} color="white" />
                    </TouchableOpacity>   

                </View>

            </View>
        </SafeAreaView>
    );
};

export default Player;

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#96ead2',
        justifyContent: 'center',
    },
    maincontainer: {
        felx: 1,
        alignItems: 'center',
        justifyContent:'center',
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
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black',
    },
    songArtist: {
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
});