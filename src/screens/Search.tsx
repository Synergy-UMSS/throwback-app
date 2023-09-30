// screen to search a music with the name of the song
import React from 'react';
import {View,Text, Platform} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
const Search = ({navigation}) => {
    return (
        <View
        style={{
            marginTop: Platform.OS === 'ios' ? 28 : 12,
        }}
        >
            
            <SearchBar />
            <Text>Busquedas Recientes</Text>
            <RecentSearchItem searchQuery="Cancion 1" />
            <RecentSearchItem searchQuery="Cancion 1" />
            <RecentSearchItem searchQuery="Cancion 1" />
            <RecentSearchItem searchQuery="Cancion 1" />
            <MiniPlayer navigation={navigation}/>
        </View>
    );
}
export default Search;
