import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SongSuggestion from '../components/SongSuggestion';
import songs from '../../data/Prueba/Data';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { usePlaylistStore } from '../store/playlistStore';

const Playlist = ({ navigation }) => {
	const ruta = useRoute();
	const { playlistName, playlistId } = ruta.params;
	const {currentPlaylist, setCurrentPlaylist} = usePlaylistStore();
	console.log('el view dice', currentPlaylist.id);
	const [localSongsAdded, setLocalSongsAdded] = useState([]);

	useEffect(() => {
		const unsubscribe = firestore().collection('playlists').doc(currentPlaylist.id).onSnapshot(
			(doc) => {
				const playlistData = doc.data();
				const songsData = playlistData.songs || []; // Si songs no está definido, se establece como un arreglo vacío
				setLocalSongsAdded(songsData);
			},
			(error) => {
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
			imgs =  localSongsAdded[0].artwork ? (
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
	<SafeAreaView style={style.MainMainContainer}>
		<TouchableOpacity style={style.flechita} onPress={() => navigation.navigate('Library')}>
			<Ionicons name="arrow-back" size={30} color="white" />
		</TouchableOpacity>
		<ScrollView>
			<View style={style.portada}>
				<View style={style.containerimgs}>
					{imgs}
				</View>
			</View>
			<View style={style.textTitle}>
				<Text style={style.mtext}>
					{playlistName !== null && playlistName !== undefined ? playlistName :currentPlaylist.name}
				</Text>
			</View>
			<View style={style.mainContainer}>
				<View style={style.container}>
					<TouchableOpacity style={style.add} onPress={() => navigation.navigate('SearchSelect')}>
						<Octicons name='diff-added' size={40} color='black' />
					</TouchableOpacity>
					<View style={style.textContainer}>
						<Text style={style.texts}>Agregar una canción</Text>
					</View>
				</View>
				{displaySongsInPlayLists()}
			</View>
		</ScrollView>
	</SafeAreaView>
);
};

export default Playlist;

const style = StyleSheet.create({
	MainMainContainer: {
		flex: 1,
		backgroundColor: 'pink',
	},
	portada: {
		/*flex: 1,*/
		backgroundColor: 'pink',
		alignContent: 'center',
		alignItems: 'center',
		paddingTop: 40,
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
	textTitle:{
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
	},
	mtext:{
		color: 'black', 
		fontSize: 20,
		fontWeight: '400',
		textTransform: 'uppercase',
	},
	mainContainer: {
		backgroundColor: 'pink',
		marginTop: 30,
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
	}
});