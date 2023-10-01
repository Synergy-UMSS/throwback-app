import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchBar = ({ updateRecentSearches }) => {
  const [busqueda, setBusqueda] = useState('');
  const [busquedasRecientes, setBusquedasRecientes] = useState([]);

  useEffect(() => {
    // Al cargar el componente, recuperar las búsquedas recientes desde AsyncStorage
    const cargarBusquedasRecientes = async () => {
      try {
        const búsquedasGuardadas = await AsyncStorage.getItem('busquedasRecientes');
        if (búsquedasGuardadas) {
          setBusquedasRecientes(JSON.parse(búsquedasGuardadas));
        }
      } catch (error) {
        console.error('Error al cargar las búsquedas recientes:', error);
      }
    };

    cargarBusquedasRecientes();
  }, []);

  const guardarBusquedaReciente = async () => {
    if (busqueda.trim() !== '') {
      const nuevasBusquedas = [...busquedasRecientes, busqueda];
      setBusquedasRecientes(nuevasBusquedas);
      try {
        await AsyncStorage.setItem('busquedasRecientes', JSON.stringify(nuevasBusquedas));
        console.log('Búsqueda guardada: ' + busqueda);
        // Llamar a la función para actualizar las búsquedas recientes
        updateRecentSearches();
      } catch (error) {
        console.error('Error al guardar la búsqueda:', error);
      }
    }
  };
  
  const getLengthRecientes = () => {
    if (busquedasRecientes.length > 0) {
      return busquedasRecientes.length;
    } else {
      return 0;
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          height: 50,
        }}
      >
        {busqueda !== '' && (
          <TouchableOpacity>
            <Animatable.View
              animation={'fadeIn'}
              duration={300}
            >
              <MaterialIcons name="arrow-back" size={30} color="gray" />
            </Animatable.View>
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10,
            height: 40,
            paddingLeft: 10,
            paddingRight: 10,
            fontSize: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            onChangeText={cambio => {
              setBusqueda(cambio);
            }}
            onSubmitEditing={() => {
              console.log('bebita bebe liean  ' + busqueda);
              guardarBusquedaReciente();
            }}
            value={busqueda}
            placeholder="¿Qué es lo que quieres escuchar?"
          />
          {busqueda !== '' && (
            <TouchableOpacity
              onPress={() => {
                setBusqueda('');
              }}
              style={{
                marginLeft: 'auto',
              }}
            >
              <Animatable.View
                animation={'fadeInRight'}
                duration={300}
                style={{
                  marginLeft: 10,
                }}
              >
                <Feather name="x-circle" size={30} color="gray" />
              </Animatable.View>
            </TouchableOpacity>
          )}
        </View>
        
        <Text>
          {getLengthRecientes()}
        </Text>
      </View>
    </View>
  );
};

export default SearchBar;
