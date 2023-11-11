import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SongSuggestion from '../components/SongSuggestion';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { useSuccesfulMessage } from '../helpcomponents/succesfulMessage';
import { useSearchStore } from '../store/searchStore';
import MiniPlayer from '../components/MiniPlayer';
import { useConnectionGlobal } from '../helpcomponents/connectionGlobal';
import ConnectionGral from '../components/ConnectionGral';
import { usePlaylistFavGlobal } from '../helpcomponents/playlistFGlobal';

const PlaylistFav = ({ navigation }) => {
	const ruta = useRoute();
	const { currentPlaylistfav, setCurrentPlaylistfav } = usePlaylistFavGlobal();
	const { isAdded, setIsAdded } = useSuccesfulMessage();
	const [localSongsAdded, setLocalSongsAdded] = useState([]);

	useEffect(() => {
		const unsubscribe = firestore()
			.collection('playlist_fav')
			.doc(currentPlaylistfav.id)
			.onSnapshot(
				doc => {
					const playlistData = doc.data();
					const songsData = playlistData.songs_fav || []; // Si songs no está definido, se establece como un arreglo vacío
					setLocalSongsAdded(songsData);
				},
				error => {
					console.error('Error al obtener el documento:', error);
				}
			);
		return () => unsubscribe();
	}, [currentPlaylistfav.id]);

	let cond = localSongsAdded.length > 3;

	const displaySongsInPlayLists = () => {
		return (
			<View>
				{localSongsAdded.map((song, index) => (
					<SongSuggestion
						key={index}
						songData={song}
						screenSelected='playlistfav'
					/>
				))}
			</View>
		)
	};

	const goToPlayer = () => {
		navigation.navigate('Player', {undefined, playlistFlow: false})
	};

	const imagePlaylist = {
		display: 'flex',
		backgroundColor: 'white',
		margin: 2,
		width: cond ? 90 : 190,
		height: cond ? 110 : 230,
	}

	return (
		<SafeAreaView style={style.MainMainContainer}>
			<TouchableOpacity style={style.flechita} onPress={() => navigation.navigate('Library')}>
				<Ionicons name="arrow-back" size={30} color="white" />
			</TouchableOpacity>
			<ScrollView style={style.scrollStyle}>
				<View style={style.portada}>
					<View style={style.containerimgs}>
						<Image source={require('../assets/playlist/heart.png')} style={imagePlaylist} />
					</View>
				</View>
				<View style={style.textTitle}>
					<Text style={style.mtext}>
						Tus favoritos
					</Text>
				</View>
				<View style={style.mainContainer}>
					<View>
						<TouchableOpacity style={style.buttonPlay} onPress={goToPlayer}>
							<Ionicons name='play-circle-outline' size={50} color='black'/>
						</TouchableOpacity>
					</View>
					{displaySongsInPlayLists()}
				</View>
			</ScrollView>
			{isAdded && (
				<View style={style.containerMessage}>
					<View style={style.successMessageContainer}>
						<Text style={style.successMessageText}>Canción agregada con éxito.</Text>
					</View>
				</View>
			)}
			<MiniPlayer navigation={navigation} style={style.miniPlayer} />
		</SafeAreaView>
	);
};

export default PlaylistFav;

const style = StyleSheet.create({
	MainMainContainer: {
		flex: 1,
		backgroundColor: '#B6BFD4',
		paddingBottom: 10,
	},
	portada: {
		/*flex: 1,*/
		backgroundColor: '#B6BFD4',
		alignContent: 'center',
		alignItems: 'center',
		paddingTop: 20,
	},
	containerimgs: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 200,
		height: 240,
		backgroundColor: '#B6BFD4',
		alignContent: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 15,
	},
	scrollStyle: {
		marginBottom: 90,
	},
	textTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	mtext: {
		color: 'black',
		fontSize: 20,
		fontWeight: '400',
	},
	mainContainer: {
		backgroundColor: '#B6BFD4',
	
	},
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignContent: 'center',
		alignItems: 'center',
		/*justifyContent: 'center',*/
		marginTop: 20,
		margin: 5,
		/*height: 50,*/
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white',
		borderRadius: 20,
	},
	img: {
		margin: 10,
		height: 40,
		width: 40,
	},
	texts: {
		color: 'black',
	},
	flechita: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingLeft: 15,
		paddingTop: 15,
	},
	add: {
		margin: 10,
	},
	containerMessage: {
		backgroundColor: 'transparent',
		position: 'absolute',
		paddingBottom: 10,
		zIndex: 1,
		bottom: 110,
		left: 0,
		right: 0,
	},
	successMessageContainer: {
		backgroundColor: '#ffffff90', // Color de fondo del mensaje de éxito
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		left: 0,
		right: 0,
	},
	successMessageText: {
		color: 'black', // Color del texto del mensaje de éxito
		textAlign: 'center',
	},
	buttonPlay: {
		justifyContent: 'center',
		textAlign: 'center',
		alignItems: 'center',
		marginTop:0,
		paddingTop: 0,
	}
});