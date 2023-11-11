import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TermsList = () => {
  const [selectedTerm, setSelectedTerm] = useState(null);

  const terms = ['Todo', 'Bedroom', 'Bsdjix', 'Bedsidjs', 'Bsijsd', 'Living Room', 'Bathroom', 'Kitchen', 'Guest Room'];

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollViewContainer}
      showsHorizontalScrollIndicator={false}
    >
      {terms.map((term) => (
        <TouchableOpacity
          key={term}
          style={[
            styles.term,
            term === selectedTerm && styles.selectedTerm,
          ]}
          onPress={() => setSelectedTerm(term)}
        >
          <Text style={[
            styles.text,
            term === selectedTerm && styles.selectedText,
          ]}>
            {term}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    paddingTop: 10, // Agrega un poco de padding vertical para mejor estética
    paddingBottom: 5,
    marginHorizontal: 10,
    // backgroundColor:'red',
    },
  term: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color:'gray',
    // backgroundColor:'red',
    marginHorizontal: 5, // Esto separará los términos horizontalmente
    // padding: 8, // Padding para que el toque sea más fácil
  },
  selectedTerm: {
    // paddingHorizontal:10,
    // paddingVertical:2,
    // Estilos adicionales para el término seleccionado
    backgroundColor: '#000000', // Cambia esto a cualquier color de fondo que desees
    // borderRadius: 15, // Esto redondeará las esquinas
  },
  text: {
    fontSize: 15, // Tamaño inicial del texto
    color: 'gray', // Color inicial del texto
    // Agrega otros estilos para el texto si es necesario
  },
  selectedText: {
    fontWeight: 'bold', // Esto hará que el texto sea negrita
    fontSize: 20, // Esto aumentará el tamaño del texto
  },
});

export default TermsList;
