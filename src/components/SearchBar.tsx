import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSearchStore} from '../store/searchStore';
const SearchBar = () => {
  const [busqueda, setBusqueda] = useState('');
  const {addRecentSearch} = useSearchStore();

  const handleSearch = () => {
    console.log("persigo tus ojos por la capital");
    if (busqueda !== '') {
      addRecentSearch(busqueda);
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
        }}>
        {busqueda !== '' && (
          <TouchableOpacity>
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
          }}>
          <TextInput
            onChangeText={cambio => {
              setBusqueda(cambio);
            }}
            onSubmitEditing={() => {
              handleSearch();
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
              }}>
              <Animatable.View
                animation={'fadeInRight'}
                duration={300}
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
