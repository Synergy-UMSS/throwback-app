import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const Connection = () => {
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setIsConnected(state.isConnected);
         });
        return ()=> {
            unsubscribe();
        }
    },[]);
    return (
            <View style={style.containerMessage}>
                <Text style={style.message}>{isConnected ?'':'No es posible reproducir la música debido a\n problemas de conectividad.'}</Text>
            </View>

    );
};

export default Connection;

const style = StyleSheet.create({
    containerMessage:{
        position:'absolute',
        bottom:0,
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: isConnected ?'#00FF0000': '#50505061',
    },
    message:{
        justifyContent:'center',
        textAlign:'center',
        fontFamily: 'Arial',
    }
})
