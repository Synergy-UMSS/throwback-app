import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

const SearchBar = () => {
  // use state for search text
  const [busqueda, setBusqueda] = useState('');

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          height: 50,
          alignContent: 'center',
        }}
      >
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={30} color="gray" />
        </TouchableOpacity>
        <TextInput
          onChangeText={(cambio) => {
            setBusqueda(cambio);
          }}
          value={busqueda} 
          style={{
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            width: '80%',
            height: 40,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 20,
          }}
          placeholder="Buscar Música"
        />
        <TouchableOpacity
          onPress={() => {
            setBusqueda(''); // Limpiar el estado al presionar el botón
          }}
        >
          <Feather name="x-circle" size={30} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SearchBar;
