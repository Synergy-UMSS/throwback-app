import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { usePlaylistFavGlobal } from '../helpcomponents/playlistFGlobal';
import { usePlaylistStore } from '../store/playlistStore';

interface FavoritePlaylistProps {
  handlePlayListView: (playlistName: string) => void;
  styles: any; 
}

const FavoritePlaylist: React.FC<FavoritePlaylistProps> = ({handlePlayListView, colorSequence, styles,}) => {
  const navigation = useNavigation();
  const favoritePlaylistName = 'Tus Me Gusta';
  const {currentPlaylistfav, setCurrentPlaylistfav} = usePlaylistFavGlobal();
  const {setCurrentPlaylist} = usePlaylistStore();

  const handlePlayListView2 = async () => {
    try {
      const playlistRef = await firestore()
        .collection('playlist_fav')
        .where('name', '==', 'favs')
        .get();
      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        const playlistId = playlistDoc.id;
        const playlistData = playlistDoc.data();
        setCurrentPlaylist({
          id: playlistId, 
          name: 'favs', 
          songs_p: playlistData.songs_fav.map((song) => song.id),
       });
        setCurrentPlaylistfav({
           id: playlistId, 
           name: 'favs', 
           songs_fav: playlistData.songs_fav,
        });
        navigation.navigate('PlaylistFav');
        
      } else {
        console.error(
          `No se encontró ninguna playlist con el nombre ${playlistName}`,
        );
      }
    } catch (error) {
      console.error('Error al obtener la playlist:', error);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => handlePlayListView2() }
      style={[styles.playlistContainer, { marginBottom: 10 }]}
    >
      <View
        style={[
          styles.playlistBackground,
          { backgroundColor: '#B6BFD4' }, // pensando
        ]}
      />
      <View style={styles.playlistBox}>
        <View style={styles.playlistContent}>
          <Image
            source={require('../assets/playlist/heart.png')}
            style={styles.playlistImage}
          />
          <View style={[styles.playlistText, { width: 200 }]}>
            <Text style={styles.playlistName} numberOfLines={2} ellipsizeMode="tail">
              {favoritePlaylistName}
            </Text>
            <Text style={styles.playlistLabel}>Lista de favoritos</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoritePlaylist;

