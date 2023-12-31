import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SongSuggestion from '../components/SongSuggestion';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { usePlaylistStore } from '../store/playlistStore';
import { useSuccesfulMessage } from '../helpcomponents/succesfulMessage';
import { useSearchStore } from '../store/searchStore';
import MiniPlayer from '../components/MiniPlayer';
import { useConnectionGlobal } from '../helpcomponents/connectionGlobal';
import { usePlayerStore } from '../store/playerStore';
import ConnectionGral from '../components/ConnectionGral';
import { useColorPlaylistGlobal } from '../helpcomponents/colorPlaylistGlobal';

const Playlist = ({ navigation }) => {
	const ruta = useRoute();
	const { playlistName, playlistId, colorPlaylist } = ruta.params;
	const { colorPlaylistCurrent, setColorPlaylistCurrent } = useColorPlaylistGlobal();
	const { currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
	const { isAdded, setIsAdded } = useSuccesfulMessage();
	const [localSongsAdded, setLocalSongsAdded] = useState([]);
	const { setCurrentSong } = usePlayerStore();
	const { isConnected } = useConnectionGlobal();
	const { showHistory, showHistoryTrue, showHistoryFalse } = useSearchStore()

	useEffect(() => {
		if(colorPlaylist !== undefined){
			setColorPlaylistCurrent(colorPlaylist);
		}
	}, [colorPlaylist]);

	useEffect(() => {
		const unsubscribeFocus = navigation.addListener('focus', () => {
			showHistoryTrue();
		});
		return () => {
			unsubscribeFocus();
		};
	}, [navigation]);

	useEffect(() => {
		if (isAdded) {
			const timeout = setTimeout(() => {
				setIsAdded(false);
			}, 1000); // Cambia 3000 a la cantidad de milisegundos que desees (por ejemplo, 3000 para 3 segundos).

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [isAdded]);

	useEffect(() => {
		const unsubscribe = firestore()
			.collection('playlists')
			.doc(currentPlaylist.id)
			.onSnapshot(
				doc => {
					const playlistData = doc.data();
					if (playlistData && playlistData.songs) {
						const songsData = playlistData.songs || []; // Si songs no está definido, se establece como un arreglo vacío
						setLocalSongsAdded(songsData);
					} else {
						setLocalSongsAdded([]);
					}
				},
				error => {
					console.error('Error al obtener el documento:', error);
				}
			);

		return () => unsubscribe();
	}, [currentPlaylist.id]);

	let imgs;
	let cond = localSongsAdded.length > 3;

	const displaySongsInPlayLists = () => {
		return (
			<View>
				{localSongsAdded.map((song, index) => (
					<SongSuggestion
						key={index}
						songData={song}
						screenSelected='playlist'
					/>
				))}
			</View>
		)
	};
	const goToSearchSelect = () => {
		setIsAdded(false);
		navigation.navigate('SearchSelect', colorPlaylist);
	};

	const goToPlayer = () => {
		if (localSongsAdded.length > 0) {
			setCurrentSong(localSongsAdded[0]);
		}
		navigation.navigate('Player', { undefined, playlistFlow: true })
	};

	const imagePlaylist = {
		display: 'flex',
		backgroundColor: 'white',
		margin: 2,
		width: cond ? 90 : 190,
		height: cond ? 110 : 230,
	};
	if (cond) {
		imgs = (
			<>
				{localSongsAdded[0].artwork ? (
					typeof localSongsAdded[0].artwork === 'number' ? (
						<Image source={localSongsAdded[0].artwork} style={imagePlaylist} />
					) : (
						<Image source={{ uri: localSongsAdded[0].artwork }} style={imagePlaylist} />
					)
				) : (
					<Image source={require('../assets/logo.png')} style={imagePlaylist} />
				)}
				{localSongsAdded[1].artwork ? (
					typeof localSongsAdded[1].artwork === 'number' ? (
						<Image source={localSongsAdded[1].artwork} style={imagePlaylist} />
					) : (
						<Image source={{ uri: localSongsAdded[1].artwork }} style={imagePlaylist} />
					)
				) : (
					<Image source={require('../assets/logo.png')} style={imagePlaylist} />
				)}
				{localSongsAdded[2].artwork ? (
					typeof localSongsAdded[2].artwork === 'number' ? (
						<Image source={localSongsAdded[2].artwork} style={imagePlaylist} />
					) : (
						<Image source={{ uri: localSongsAdded[2].artwork }} style={imagePlaylist} />
					)
				) : (
					<Image source={require('../assets/logo.png')} style={imagePlaylist} />
				)}
				{localSongsAdded[3].artwork ? (
					typeof localSongsAdded[3].artwork === 'number' ? (
						<Image source={localSongsAdded[3].artwork} style={imagePlaylist} />
					) : (
						<Image source={{ uri: localSongsAdded[3].artwork }} style={imagePlaylist} />
					)
				) : (
					<Image source={require('../assets/logo.png')} style={imagePlaylist} />
				)}
			</>
		);

	} else {
		if (localSongsAdded.length > 0) {
			imgs = localSongsAdded[0].artwork ? (
				typeof localSongsAdded[0].artwork === 'number' ? (
					<Image source={localSongsAdded[0].artwork} style={imagePlaylist} />
				) : (
					<Image source={{ uri: localSongsAdded[0].artwork }} style={imagePlaylist} />
				)
			) : (
				<Image source={require('../assets/logo.png')} style={imagePlaylist} />
			)
		} else {
			imgs = <Image source={require('../assets/logo.png')} style={imagePlaylist} />
		}
	}
	return (
		<SafeAreaView style={[style.MainMainContainer, { backgroundColor: colorPlaylistCurrent }]}>
			<TouchableOpacity style={style.flechita} onPress={() => navigation.navigate('Library')}>
				<Ionicons name="arrow-back" size={30} color="white" />
			</TouchableOpacity>
			<ScrollView style={style.scrollStyle}>
				<View style={[style.portada, { backgroundColor: colorPlaylistCurrent}]}>
					<View style={style.containerimgs}>
						{imgs}
					</View>
				</View>
				<View style={style.textTitle}>
					<Text style={style.mtext}>
						{playlistName !== null && playlistName !== undefined ? playlistName : currentPlaylist.name}
					</Text>
				</View>
				<View style={[style.mainContainer, { backgroundColor: colorPlaylistCurrent }]}>
					{(localSongsAdded.length > 0) ? (
						<View>
							<TouchableOpacity style={style.buttonPlay} onPress={goToPlayer}>
								<Ionicons name='play-circle-outline' size={50} color='black' />
							</TouchableOpacity>
						</View>
					) : (
						<></>
					)}
					<View style={style.container}>
						<TouchableOpacity style={style.add} onPress={goToSearchSelect}>
							<Octicons name='diff-added' size={40} color='black' />
						</TouchableOpacity>
						<View style={style.textContainer}>
							<Text style={style.texts}>Agregar una canción</Text>
						</View>
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

export default Playlist;

const style = StyleSheet.create({
	MainMainContainer: {
		flex: 1,
		backgroundColor: 'pink',
		paddingBottom: 10,
	},
	portada: {
		/*flex: 1,*/
		backgroundColor: 'pink',
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
		backgroundColor: 'white',
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
		backgroundColor: 'pink',

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
		marginTop: 0,
		paddingTop: 0,
	}
});