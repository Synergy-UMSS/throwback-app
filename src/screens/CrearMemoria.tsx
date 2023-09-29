import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import xml2js from 'react-native-xml2js';

const CrearMemoria = () => {
  const [nombreMemoria, setNombreMemoria] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');

  const guardarMemoria = () => {
    // Crear un objeto de datos de memoria
    const memoria = {
      nombre: nombreMemoria,
      descripcion: descripcion,
      fecha: fecha,
    };

    // Convertir el objeto a XML
    const builder = new xml2js.Builder();
    const xmlMemoria = builder.buildObject(memoria);

    // Aquí puedes guardar el XML en un archivo o enviarlo a través de una API
    console.log(xmlMemoria);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Memoria:</Text>
      <TextInput
        style={styles.input}
        value={nombreMemoria}
        onChangeText={setNombreMemoria}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Fecha:</Text>
      <TextInput
        style={styles.input}
        value={fecha}
        onChangeText={setFecha}
        placeholder="YYYY-MM-DD"
      />

      <Button title="Guardar" onPress={guardarMemoria} />
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
});

export default CrearMemoria;
