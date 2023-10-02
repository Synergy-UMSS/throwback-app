import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Player from './src/screens/Player';
import Search from './src/screens/Search';
import Splash from './src/screens/Splash';
import {MusicPlayerProvider} from './src/components/MusicPlayerContext';
import {RootStackParamList} from './src/utils/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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
          name="Home"
          component={Home}
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
