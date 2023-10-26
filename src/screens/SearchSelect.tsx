import React, {useEffect, useState} from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import MiniPlayer from '../components/MiniPlayer';
import SearchBar from '../components/SearchBar';
import RecentSearchItem from '../components/RecentSearch';
import {useSearchStore} from '../store/searchStore';
import SongSuggestionSelect from '../components/SongSuggestionSelect';
import { ScrollView } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';
import {getSongsGlobal} from '../helpcomponents/songsGlobal';

let tracks = [];

const SearchSelect = ({navigation}) => {
  const db = firebase.firestore();
  const songsRef = db.collection('songs');
  const {isLoading, setIsLoading } = getSongsGlobal();
  useEffect(() => {
		const fetchSongs = async () => {
			try {
				const querySnapshot = await songsRef.get();
				const songs1 = [];
				querySnapshot.forEach((doc) => {
					const song = doc.data();
					songs1.push(song);
				});
				songs1.forEach((song, index) => {
					const track = {
						id:  parseInt(song.id),
						url: song.songURL,
						title: song.title,
						artist: song.artist,
						artwork: song.coverURL,
					};
					tracks.push(track);
				});
			} catch (e) {
				console.error('Error al obtener las canciones:', e);
			}
		};
    if(!isLoading){
      fetchSongs();
      setIsLoading(true);
    }else{}
	}, []);

  const {clearRecentSearches, recentSearches, showHistory, currentSearch, updateRecentSearches,} =
    useSearchStore();

  const clearSearches = () => {
    clearRecentSearches();
  };

  const displaySearches = () => {
    if (!showHistory) return null;
    return recentSearches.map((searchQuery, index) => (
      <RecentSearchItem key={index} searchQuery={searchQuery} />
    ));
  };

  const handlePress = paila => {
    console.log('handlePress ' + paila);
  };
  const matching = (query, song) => {
    const {title, artist} = song;
    const lowerCaseQuery = query ? query.toLowerCase() : '';
    const lowerCaseTitle = title ? title.toLowerCase() : '';
    const lowerCaseArtist = artist ? artist.toLowerCase() : '';

    return (
      lowerCaseTitle.includes(lowerCaseQuery) ||
      lowerCaseArtist.includes(lowerCaseQuery)
    );
  };

  let suggests = [];
  const displaySongSuggestionsSelect = () => {
    if (showHistory || currentSearch.length===0) return null;
    suggests = [];
    let mimi = currentSearch;
    for (let j = 0; j < tracks.length; j++){
      if (matching(mimi, tracks[j])) {
        suggests.push(tracks[j])
      }
    }

    return (
      <View>
        {suggests.map((song, index) => (
          <SongSuggestionSelect
            key={index}
            songData={song}
            onOptionPress={handlePress}
            screenSelected='search2'
          />
        ))}
        {suggests.length === 0 && (<Text style={{textAlign: 'center',color:'#777'}}>No se ha encontrado ningún resultado</Text>)}
      </View>
      
    );
  };

  useEffect(() => {
    if (showHistory) {
      updateRecentSearches();
    }
  }, [showHistory, updateRecentSearches]);
  return (
    <View
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 28 : 12,
        position: 'relative', // Agrega esta propiedad
      }}>
      <SearchBar
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <ScrollView style={{paddingTop: 0}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            height: 50,
          }}>
          {showHistory && (
            <Text style={{ fontSize: 16/*, fontWeight: 'nunito'*/, color: 'black' }}>
              Búsquedas Recientes
            </Text>
          )}
          <TouchableOpacity
            onPress={() => {
              clearSearches();
            }}>
            {showHistory && (
              <Text style={{fontSize: 12, color: 'gray'}}>
                Borrar Historial
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {displaySongSuggestionsSelect()}
        {showHistory && (
          <View>
            {recentSearches.map((search, index) => (
              <RecentSearchItem key={index} searchQuery={search} />
            ))}
          </View>
        )}
        <Text>{'\n\n'}</Text>
      </ScrollView>
      <MiniPlayer navigation={navigation} />
    </View>
  );
};


export default SearchSelect;
