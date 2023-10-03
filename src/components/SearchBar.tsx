import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { useSearchStore } from '../store/searchStore';
const SearchBar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const { addRecentSearch, showHistoryTrue, showHistoryFalse,updateCurrentSearch} = useSearchStore();

  useEffect(() => {
    // Agregar un oyente para detectar si el teclado está abierto o cerrado
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardOpen(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardOpen(false);
    });

    // Limpieza de oyentes al desmontar el componente
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSearch = () => {
    if (busqueda !== '') {
      addRecentSearch(busqueda);
      updateCurrentSearch(busqueda);
    }
  };

  const handleBack = () => {
    // Limpiar búsqueda y cerrar el teclado
    setBusqueda('');
    updateCurrentSearch('');
    Keyboard.dismiss();
    showHistoryTrue();
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
        {(isKeyboardOpen || busqueda !== '') && (
          <TouchableOpacity
            onPress={() => {
              handleBack();
            }}
          >
            <Animatable.View animation={'fadeIn'} duration={300}>
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
              showHistoryFalse();
            }}
            onSubmitEditing={() => {
              handleSearch();
            }}
            value={busqueda}
            placeholder="¿Qué es lo que quieres escuchar?"
          />
          {(isKeyboardOpen || busqueda !== '')&& (
            <TouchableOpacity
              onPress={() => {
                setBusqueda('');
                showHistoryTrue();
                updateCurrentSearch('');
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
      </View>
    </View>
  );
};

export default SearchBar;
