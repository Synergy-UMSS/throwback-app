import React, {useContext} from 'react';
import { View, Modal, Button, Dimensions, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import Player from '../screens/Player';
import { MusicPlayerContext } from '../components/MusicPlayerContext';

const MiniPlayer = ({ navigation }) => {
    const {isPlaying} = useContext(MusicPlayerContext);
    console.log('isPlaying:', isPlaying);
    if (isPlaying){
        console.log('isPlaying:', isPlaying);
        return (
            <View style={style.maincontainer}>
                <TouchableOpacity style={style.container} onPress={()=>navigation.navigate(Player)}>
                    <Text> Reproduciendo canción </Text>
                </TouchableOpacity>
            </View>
        )
    }
    return null;
}

export default MiniPlayer;

const style = StyleSheet.create({
    maincontainer:{
        flex:1,
    },
    container:{
        flexDirection: 'row',
        height: 50,
        borderRadius:25,
        backgroundColor: '#96EAD280',
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        bottom: Dimensions.get('window').height * -1 +100,
    },
})

