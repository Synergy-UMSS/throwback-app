import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';

const CreateMemory = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setValue('fechaMemoria', currentDate.toISOString().split('T')[0]); // Formatea la fecha como YYYY-MM-DD
  };

  const guardarMemoria = async (data) => {
    try {
      await firestore().collection('memorias').add({
        tituloMemoria: data.tituloMemoria,
        descripcionMemoria: data.descripcionMemoria,
        fechaMemoria: data.fechaMemoria,
      });
      console.log('Memoria guardada correctamente.');
    } catch (error) {
      console.error('Error al guardar la memoria: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título de la Memoria:</Text>
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
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>{date.toISOString().split('T')[0]}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          minimumDate={new Date()} // No permite fechas posteriores al día actual
          mode="date"
          onChange={onDateChange}
        />
      )}

      <Button title="Guardar" onPress={handleSubmit(guardarMemoria)} />
    </View>
  );
};

const styles = {
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
  error: {
    color: 'red',
  },
};

export default CreateMemory;
