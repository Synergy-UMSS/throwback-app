import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { usePlaylistFavGlobal } from '../helpcomponents/playlistFGlobal';

interface FavoritePlaylistProps {
  handlePlayListView: (playlistName: string) => void;
  colorSequence: string[];
  styles: any; 
}

const FavoritePlaylist: React.FC<FavoritePlaylistProps> = ({handlePlayListView, colorSequence, styles,}) => {
  const navigation = useNavigation();
  const favoritePlaylistName = 'Mis Favoritos';
  const {currentPlaylistfav, setCurrentPlaylistfav} = usePlaylistFavGlobal();
  const handlePlayListView2 = async () => {
    try {
      const playlistRef = await firestore()
        .collection('playlist_fav')
        .where('name', '==', 'favs')
        .get();
      if (!playlistRef.empty) {
        const playlistDoc = playlistRef.docs[0];
        const playlistId = playlistDoc.id;
        {/*setCurrentPlaylistfav({ id: playlistId, name: 'favs' });*/}
        navigation.navigate('PlaylistFav');
        console.log(currentPlaylistfav);
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
            <Text style={styles.playlistLabel}>Lista de reproducción</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoritePlaylist;

