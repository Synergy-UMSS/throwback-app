import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import TusMemoriasMusicales from './src/screens/TusMemoriasMusicales';
import Reproductor from './src/screens/Reproductor';
import DetalleMemoria from './src/screens/DetalleMemoria';
import Search from './src/screens/Search';
import CrearMemoria from './src/screens/CrearMemoria';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Movible = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={TusMemoriasMusicales}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
