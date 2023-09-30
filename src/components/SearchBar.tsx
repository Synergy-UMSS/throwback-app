import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const SearchBar = () => {
  // use state for search text
  const [busqueda, setBusqueda] = useState('');
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          height: 50,
        }}>
        {busqueda !== '' && (
          <TouchableOpacity>
            <Animatable.View
              animation={'fadeIn'}
              duration={300} // Duración de la animación en milisegundos
            >
              <MaterialIcons name="arrow-back" size={30} color="gray" />
            </Animatable.View>
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 1, // Utiliza flex para que el TextInput tome todo el espacio disponible
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            height: 40,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 10,
            flexDirection: 'row',
            alignItems: 'center', // Alinea verticalmente el contenido del View
          }}>
          <TextInput
            onChangeText={cambio => {
              setBusqueda(cambio);
            }}
            onSubmitEditing={() => {
              console.log('bebita bebe liean  ' + busqueda);
            }}
            value={busqueda}
            placeholder="¿Qué es lo que quieres escuchar?"
          />
          {busqueda !== '' && ( // Muestra el ícono de "X" solo si hay texto en el campo
            <TouchableOpacity
              onPress={() => {
                setBusqueda(''); // Limpiar el estado al presionar el botón
              }}
              style={{
                marginLeft: 'auto', // Agrega margen izquierdo para separar el ícono del texto
              }}>
              <Animatable.View
                animation={'fadeInRight'}
                duration={300} // Duración de la animación en milisegundos
                style={{
                  marginLeft: 10,
                }}>
                <Feather name="x-circle" size={30} color="gray" />
              </Animatable.View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
