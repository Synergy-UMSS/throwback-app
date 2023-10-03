import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CrearMemoria from './src/screens/CrearMemoria';
import Reproductor from './src/screens/Reproductor';
import MemoryList from './src/screens/MemoryList';
import Player from './src/screens/Player';
import Search from './src/screens/Search';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import {MusicPlayerProvider} from './src/components/MusicPlayerContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from './src/utils/types';
import MemoryDetail from './src/screens/MemoryDetail';
const Stack = createStackNavigator<RootStackParamList>();
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MemoryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
          name="Tus memorias musicales" 
          component={MemoryList} 
          options={{
            headerStyle: {
              backgroundColor: '#e4e6dc',
            },
            headerTitleStyle: {
              fontSize: 22,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 18,
            },
            headerShown: true,
            cardStyle: { backgroundColor: '#e4e6dc' }
          }}
      />
      <Stack.Screen
        name="Reproductor"
        component={Reproductor} 
      />
      <Stack.Screen 
          name="MemoryDetail" 
          component={MemoryDetail} 
          options={{
            title: ' ',
            headerStyle: {
              backgroundColor: '#e4e6dc'
            },
            cardStyle: { backgroundColor: '#e4e6dc' }
          }}
      />
    </Stack.Navigator>
  );
}

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
            tabBarIcon: ({color, size}) => (
              <FontAwesomeIcon name="search" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Player"
          component={Player}
          options={{
            tabBarLabel: 'Reproducir',
            tabBarIcon: ({color, size}) => (
              <Icon name="play-circle" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <MusicPlayerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Home"
            component={Movible}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Player"
            component={Player}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MusicPlayerProvider>
  );
};

export default App;
