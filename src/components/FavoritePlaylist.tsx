import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';

interface FavoritePlaylistProps {
  handlePlayListView: (playlistName: string) => void;
  styles: any; 
}

const FavoritePlaylist: React.FC<FavoritePlaylistProps> = ({
  handlePlayListView,
  styles,
}) => {
  const favoritePlaylistName = 'Mis Favoritos';

  return (
    <TouchableOpacity
      onPress={() => handlePlayListView(favoritePlaylistName)}
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
;
