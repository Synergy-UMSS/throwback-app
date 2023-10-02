import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';
import ItemSong from '../components/PreviewSong';

const CrearMemoria = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const memoria = {
      titulo_memoria: data.tituloMemoria,
      descripcion_memoria: data.descripcionMemoria,
      fecha_creacion: firestore.Timestamp.now(),
      fecha_memoria: firestore.Timestamp.fromDate(new Date(data.fechaMemoria)),
      titulo_cancion: 'Sample Song',
      artista_cancion: 'Artist',
    };

    try {
      await firestore().collection('memorias').add(memoria);
      console.log('Memoria guardada correctamente.');
    } catch (error) {
      console.error('Error al guardar la memoria: ', error);
    }
  };

  const playSong = () => {
    navigation.navigate('Reproductor', { memoriaId: 1 }); // mandando id 1 para probar
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
            style={styles.input}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="descripcionMemoria"
        defaultValue=""
      />

      <Text style={styles.label}>Fecha de Memoria:</Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder="YYYY-MM-DD"
          />
        )}
        name="fechaMemoria"
        defaultValue=""
        rules={{ required: true }}
      />

      <Text style={styles.label}>Cancion Vinculada:</Text>
      <View style={styles.marginBottom}>
        <ItemSong
          song='SampleSong'
          artist='Artist'
          onPlay={playSong}
        />
      </View>

      <Button title="Guardar" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginTop: 8,
  },
  marginBottom: {
    marginTop: 40,
    marginBottom: 40,
  },
  error: {
    color: 'red',
  },
});

export default CrearMemoria;
