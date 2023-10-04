import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa DateTimePicker
import ItemSong from '../components/PreviewSong';
import placeholderImage from '../assets/placeholder.png';
import { usePlayerStore } from '../store/playerStore';
import songs from '../../data/Prueba/Data';
import MemoryList from './MemoryList';

const CrearMemoria = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const {setCurrentSong, currentSong} = usePlayerStore();
  const songg = songs.find(s => s.title === currentSong.title);
  const songArtwork = songg ? songg.artwork : null;
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  
  const memoryList = () => {
    navigation.navigate(MemoryList, {});
    setSuccessModalVisible(false);
  };

  const onSubmit = async (data) => {
    const memoria = {
      titulo_memoria: data.tituloMemoria,
      descripcion_memoria: data.descripcionMemoria,
      fecha_creacion: firestore.Timestamp.now(),
      fecha_memoria: firestore.Timestamp.fromDate(selectedDate),
      titulo_cancion: currentSong.title,
      artista_cancion: currentSong.artist,
    };

    try {
      await firestore().collection('memorias').add(memoria);
      console.log('Memoria guardada correctamente.');
      setSuccessModalVisible(true);
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


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 16 }}>Título de la Memoria:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            maxLength={40}
          />
        )}
        name="tituloMemoria"
        defaultValue=""
        rules={{ required: true }}
      />
      {errors.tituloMemoria && <Text style={styles.error}>Este campo es obligatorio.</Text>}

      <Text style={styles.label}>Descripción:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.inputdescripcion}
            value={value}
            onChangeText={onChange}
            maxLength={500}
          />
        )}
        name="descripcionMemoria"
        defaultValue=""
      />

      <Text style={styles.label}>Fecha de Memoria:</Text>
      <TextInput
        style={styles.input}
        value={selectedDate.toISOString().split('T')[0]}
        onFocus={() => setShowDatePicker(true)}
        placeholder="YYYY-MM-DD"
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

      <Text style={styles.label}>Cancion Vinculada:</Text>
      <View style={styles.marginBottom}>
        <ItemSong
          song={currentSong.title}
          artist={currentSong.artist}
          imageUri={songArtwork || placeholderImage}
          onPlay={playSong}
        />
      </View>

<<<<<<< Updated upstream
      <Button style={styles.button} title="Guardar" onPress={handleSubmit(onSubmit)} />
=======
      <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
      
      <Modal
        isVisible={successModalVisible}
        onBackdropPress={() => setSuccessModalVisible(false)}
      >
        <View style={styles.modalContent}>
          <Text style={styles.successText}>Memoria creada con éxito.</Text>
          <Button
            title="Okay"
            onPress={memoryList}
          />
        </View>
        </Modal>
>>>>>>> Stashed changes
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ' #e4e6dc',
    flex: 1,
    padding: 16,
    color: '#e4e6dc',
  },
  label: {
    fontFamily:'Quicksand-VariableFont',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 17,
    borderColor: 'black',
  },
  inputdescripcion: {
    fontSize: 16,
    borderWidth: 1,
    padding: 8,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 17,
    borderColor: 'black',
    height: 200,
  },
  marginBottom: {
    marginTop: 40,
    marginBottom: 40,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#4ADCC8',
  },
  error: {
    color: 'red',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CrearMemoria;
