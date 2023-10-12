import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
// import Sound from 'react-native-sound';

const screenWidth = Dimensions.get('window').width;

const playChirpSound = () => {
    // Asume que tienes un archivo de sonido llamado "chirp.mp3" en la carpeta "assets"
    // const sound = new Sound('chirp.mp3', Sound.MAIN_BUNDLE, (error) => {
    //     if (error) {
    //         console.log('Error al cargar el sonido', error);
    //         return;
    //     }
    //     sound.play(() => sound.release());
    // });
};

const MusicalMemoryHeader = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Tus Memorias Musicales</Text>
                <TouchableOpacity onPress={playChirpSound}>
                    <Image 
                        source={require('../assets/patofacheritov2.jpg')} 
                        style={styles.image}
                    />
                </TouchableOpacity>
                {/* Aquí puedes agregar las notas musicales con posicionamiento absoluto si es necesario */}
            </View>
            <View style={styles.bottomRectangle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FCF1DF',
        // height: screenWidth * 0.45,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    headerText: {
        flex: 1,
        fontSize: screenWidth * 0.1,
        color: 'black',
    },
    image: {
        width: screenWidth * 0.45,
        height: screenWidth * 0.55,
        // resizeMode: 'contain',
        // position: 'absolute',   // Posicionamiento absoluto
        // bottom: -(screenWidth * 0.45),             // Mueve el pollito hacia abajo para que se superponga sobre el rectángulo
        // right: ,              // Ajusta según la posición deseada en el eje X
        //  zIndex: 1               // Asegura que el pollito esté por encima del rectángulo
    },
    bottomRectangle: {
        height: 20,
        backgroundColor: '#e4e6dc',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    }
});

export default MusicalMemoryHeader;
