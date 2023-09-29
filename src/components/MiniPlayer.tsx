import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Player from '../screens/Player';

const MiniPlayer = ({ trackTitle, trackArtist, trackArtwork }) => {
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
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
        <View style={style.container}>
            <View style={style.miniContainer}>
                <View style={style.miniImageWrapper}>
                    <Image
                        source={trackArtwork}
                        style={StyleSheet.musicImage}
                    />
                </View>
                <View>
                    <Text style={style.songTitle}>{trackTitle}</Text>
                    <Text style={style.songArtist}>{trackArtist}</Text>
                </View>
            </View>
        </View>
        </Modal>
    );
};

export default MiniPlayer;

const style= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        background:'rgba(0,0,0,0.5)',
    },
    miniContainer:{
        width: 80,
        padding:20,
        backgroundColor: '#fff',
        borderRadius:10,
        alignItems: 'center',
    },
});