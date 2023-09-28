import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Player = () => {
    return (
        <SafeAreaView style={style.container}>
            <View style={style.maincontainer}>
    
                <View style={[style.imageWrapper, style.elevation]}> 
                    <Image 
                        source={require('../../assets-prueba/images/Lust_for_Life.png')}
                        style={style.musicImage}
                    />
                </View>
               
                <View>
                    <Text style={style.songTitle}>13 Beaches</Text>
                    <Text style={style.songArtist}>Lana del Rey</Text>
                </View>

                <View>
                    <View style={style.songDurationMain}>
                        <Text style={style.songDuration}>00:00</Text>
                        <Text style={style.songDuration}>04:00</Text>
                    </View>
                    <Slider
                        style={style.songSlider}
                        value = {10}
                        minimumValue ={0}
                        maximumValue= {100}
                        thumbTintColor = 'pink'
                        minimumTrackTintColor='black'
                        maximumTrackTintColor='white'
                        onSlidingComplete={() => {}}
                    />
                </View>

                <View style={style.songControl}>
                    <TouchableOpacity onPress={() => {}}>
                        <Feather name="play" size={44} color="black" />
                    </TouchableOpacity>     

                    <TouchableOpacity onPress={() => {}}>
                        <Ionicons name="pause-outline" size={44} color="black" />
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