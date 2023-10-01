/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import MemoryList from './src/screens/MemoryList';
import Reproductor from './src/screens/Reproductor';

import Search from './src/screens/Search';
import  from './src/screens/CrearMemoria';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Movible = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MemoryList}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CrearMemoria"
        component={CrearMemoria}
        options={{
          tabBarLabel: 'Crear',
          tabBarIcon: ({ color, size }) => (
            <Icon name="add" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Home" component={Movible} options={{ headerShown: false }}/>
        <Stack.Screen name="CrearMemoria" component={CrearMemoria} />
        <Stack.Screen name="Reproductor" component={Reproductor} />
        <Stack.Screen name="DetalleMemoria" component={DetalleMemoria} />
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import 'react-native-gesture-handler';
import Search from './src/screens/Search';
import {RootStackParamList} from './src/utils/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
export const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

import Reproductor from './src/screens/Reproductor';
import MemoryDetail from './src/screens/MemoryDetail';
import {MemoryNavigator} from './src/navigations/MemoryNavigator';

const App = () => {
  function Movible() {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#b5b3b3',
          tabBarStyle: {
            backgroundColor: '#787474',
          },
        }}>
        <Tab.Screen
          name="Home_memory"
          component={MemoryNavigator}
          options={{
            tabBarLabel: 'Inicio',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon name="search" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={Movible}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Reproductor" component={Reproductor} />
        <Stack.Screen name="MemoryDetail" component={MemoryDetail} />
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={'Search'}
          component={Splash}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
