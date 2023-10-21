import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import SongSuggestion from '../components/SongSuggestion';
import songs from '../../data/Prueba/Data';

const Playlist = ({ navigation }) => {
	let imgs;
	let songsAdded = songs;
	let cond = songsAdded.length > 1;
	const displaySongsInPlayLists = () => {
		return (
			<View>
				{songsAdded.map((song, index) => (
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
		width: cond ? 90 : 190,
		height: cond ? 110 : 230,
	};
	if (cond) {
		imgs = (
			<>
				<Image
					source={require('../../assets-prueba/images/Lust_for_Life.png')}
					style={imagePlaylist} />
				<Image
					source={require('../../assets-prueba/images/Lust_for_Life.png')}
					style={imagePlaylist} />
				<Image
					source={require('../../assets-prueba/images/Lust_for_Life.png')}
					style={imagePlaylist} />
				<Image
					source={require('../../assets-prueba/images/Lust_for_Life.png')}
					style={imagePlaylist} />
			</>
		);

	} else {
		imgs = <Image
			source={require('../../assets-prueba/images/Lust_for_Life.png')}
			style={imagePlaylist} />;
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
				<View style={style.mainContainer}>
					<View style={style.container}>
						<TouchableOpacity style={style.add} onPress={() => navigation.navigate('Search')}>
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