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
            <View style={{position:'absolute',
                bottom:0,
                height:40,
                width:'100%',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor: isConnected ?'#00FF0000': '#50505061',}}>
                <Text style={{justifyContent:'center', textAlign:'center',}}>{isConnected ?'':'No es posible reproducir la música debido a                    problemas de conectividad.'}</Text>
            </View>

    );
};

export default Connection;