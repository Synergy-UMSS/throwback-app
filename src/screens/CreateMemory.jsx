import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/logo.png';
import { usePlayerStore } from '../store/playerStore';
import songs from '../../data/Prueba/Data';
import RequiredField from '../components/RequiredField';
import { format } from 'date-fns';




const CrearMemoria = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {setCurrentSong, currentSong} = usePlayerStore();
  const songg = songs.find(s => s.title === currentSong.title);
  const songArtwork = songg ? songg.artwork : null;


  const onSubmit = async (data) => {
    const memoria = {
      titulo_memoria: data.tituloMemoria,
      descripcion_memoria: data.descripcionMemoria,
      fecha_creacion: firestore.Timestamp.now(),
      fecha_memoria: firestore.Timestamp.fromDate(selectedDate),
      titulo_cancion: currentSong.title,
      artista_cancion: currentSong.artist,
    };

    {/*const isSpecialCharacter = (value) => {
      return /^[a-zA-Z0-9\s\-]+$/.test(value); // Expresión regular que permite letras, números, espacios y guiones
    };*/}

    try {
      await firestore().collection('memorias').add(memoria);
      console.log('Memoria guardada correctamente.');
      showSuccessAlert();
    } catch (error) {
      console.error('Error al guardar la memoria: ', error);
    }
  };

  const playSong = async () => {
    const songToPlay = songs.find(s => s.title === currentSong.title);
    if (!songToPlay) return;
    await setCurrentSong(songToPlay);
    navigation.navigate('Player'); 
  };

  const showSuccessAlert = () => {
    Alert.alert(
      'Memoria creada con éxito',
      'La memoria se ha guardado correctamente.',
      [
        {
          text: 'Aceptar',
          onPress: () => {
            navigation.navigate('Home'); // Redirige a la vista "home"
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
    
      <Text style={styles.pageTitle}>Crear memoria musical</Text>

      <RequiredField>Título de la Memoria:</RequiredField>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            maxLength={25}
          />
        )}
        name="tituloMemoria"
        defaultValue=""
        rules={{
          required: 'Este campo es obligatorio',
          validate: {
            noSpecialChars: (value) => !/[!@#$%^&*(),.?":{}|<>]/.test(value) || 'No se permiten caracteres especiales',
          },
        }}
      />
      {errors.tituloMemoria && <Text style={styles.error}>{errors.tituloMemoria.message}</Text>}


      <Text style={styles.label}>Descripción:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            maxLength={150}
          />
        )}
        name="descripcionMemoria"
        defaultValue=""
      />
          
      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={format(selectedDate, 'dd/MM/yyyy')} // Cambia el formato aquí
        onFocus={() => setShowDatePicker(true)}
        placeholder="dd/mm/aaaa"
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) {
              setSelectedDate(date);
              setShowDatePicker(false);
            }
          }}
          maximumDate={new Date()} // Establece la fecha máxima como la fecha actual
        />
      )}

      <Text style={styles.label}>Canción vinculada:</Text>
      <View style={styles.marginBottom}>
        <ItemSong
          song={currentSong.title}
          artist={currentSong.artist}
          imageUri={songArtwork || placeholderImage}
          onPlay={playSong}
        />
      </View>

      <Pressable title="Crear Memoria" onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight:'bold' }}>Crear Memoria</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e4e6dc',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
    color: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    fontFamily: 'Arial',
    color: 'black',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
    fontFamily: 'Arial',
    borderRadius: 10,
    backgroundColor: 'white',
    color: 'black',

  },
  marginBottom: {
    marginTop: 8,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontFamily: 'Arial',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20, // Ajusta el tamaño horizontal según tus preferencias
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'black',
    alignSelf: 'center',
  },
});

export default CrearMemoria;
