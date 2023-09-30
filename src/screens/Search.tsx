// screen to search a music with the name of the song
import React from 'react';
import {View,Text, Platform} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';

const Search = ({navigation}) => {
    return (
        <View
        style={{
            marginTop: Platform.OS === 'ios' ? 28 : 12,
        }}
        >
            <SearchBar />
            
            <MiniPlayer navigation={navigation}/>
        </View>
    );
}
export default Search;
