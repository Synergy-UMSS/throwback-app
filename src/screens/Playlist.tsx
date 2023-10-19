import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Playlist = () => {
    let imgs;
    let cond = true;
    const imagePlaylist={
        display: 'flex',
        backgroundColor: 'white',
        width: cond? 90: 190,
        height: cond ? 110: 230,
    };

    if(cond) {
        imgs = (
            <>
            <Image 
            source={require('../../assets-prueba/images/Lust_for_Life.png')}
            style={imagePlaylist} />
            <Image 
            source={require('../../assets-prueba/images/Lust_for_Life.png')}
            style={imagePlaylist} />
            <Image 
            source={require('../../assets-prueba/images/Lust_for_Life.png')}
            style={imagePlaylist} />
            <Image 
            source={require('../../assets-prueba/images/Lust_for_Life.png')}
            style={imagePlaylist} />
            </>
        );
    } else {
        imgs = <Image 
        source={require('../../assets-prueba/images/Lust_for_Life.png')}
        style={imagePlaylist} />;
    }
    return (
        <View style={style.portada}>
            <View style={style.containerimgs}>
                {imgs}
            </View>
        </View>
    );
};

export default Playlist;

const style = StyleSheet.create({
    portada:{
        flex: 1,
        backgroundColor: 'pink',
        alignContent: 'center',
        alignItems: 'center', 
        paddingTop: 40,
    },
    containerimgs:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 200,
        height: 240,
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 15,
    },
    
});