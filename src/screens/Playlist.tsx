import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SongSuggestion from '../components/SongSuggestion';
import songs from '../../data/Prueba/Data';

const Playlist = () => {
	let imgs;
	let cond = false;
	const imagePlaylist = {
		display: 'flex',
		backgroundColor: 'white',
		width: cond ? 90 : 190,
		height: cond ? 110 : 230,
	};

		
	let songsAdded = songs;
	console.log('musics', songsAdded);
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
			<View style={style.portada}>
				<View style={style.containerimgs}>
					{imgs}
				</View>
			</View>
			<View style={style.mainContainer}>
				<View style={style.container}>
					<Image source={require('../../assets-prueba/images/Lust_for_Life.png')}
						style={style.img} />
					<View style={style.textContainer}>
						<Text style={style.texts}>'13 beaches'</Text>
						<Text style={style.texts}>'Lana del Rey'</Text>
					</View>
				</View>
				{displaySongsInPlayLists()}
			</View>
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
		height: 50,
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: 'white',
	},
	img: {
		margin: 10,
		height: 40,
		width: 40,
	},
	texts: {
		color: 'black',
	},

});