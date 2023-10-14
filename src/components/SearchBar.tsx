import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {useSearchStore} from '../store/searchStore';

const SearchBar = () => {
  const [busqueda, setBusqueda] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isSearchBoxFocused, setIsSearchBoxFocused] = useState(false);
  const {
    addRecentSearch,
    showHistory,
    showHistoryTrue,
    showHistoryFalse,
    updateCurrentSearch,
  } = useSearchStore();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSearch = () => {
    const trimmedBusqueda = busqueda.trim();
    if (trimmedBusqueda !== '') {
      addRecentSearch(trimmedBusqueda);
      updateCurrentSearch(trimmedBusqueda);
    }
  };

  const handleBack = () => {
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
        }}>
        {(isKeyboardOpen || busqueda !== '') && (
          <TouchableOpacity
            onPress={() => {
              handleBack();
            }}>
            <Animatable.View animation={'fadeIn'} duration={300}>
              <MaterialIcons name="arrow-back" size={30} color="gray" />
            </Animatable.View>
          </TouchableOpacity>
        )}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 10, // Ajusta este valor para redondear las esquinas
            height: 40,
            paddingHorizontal: 10,
          }}>
          {showHistory && (
            <MaterialIcons name="search" size={20} color="gray" />
          )}
          <TextInput
            onFocus={() => setIsSearchBoxFocused(true)}
            onBlur={() => setIsSearchBoxFocused(false)}
            onChangeText={cambio => {
              setBusqueda(cambio);
              showHistoryFalse();
            }}
            onSubmitEditing={() => {
              handleSearch();
            }}
            value={busqueda}
            placeholder="¿Qué es lo que quieres escuchar?"
            maxLength={50}
            style={{
              flex: 1,
              color: 'black',
              fontFamily: 'Arial',
            }}
          />
          {(isKeyboardOpen || busqueda !== '') && (
            <TouchableOpacity
              onPress={() => {
                setBusqueda('');
                showHistoryTrue();
                updateCurrentSearch('');
              }}
              style={{
                marginLeft: 10,
              }}>
              <Animatable.View animation={'fadeInRight'} duration={300}>
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
