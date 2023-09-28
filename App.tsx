import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import Search from './src/screens/Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Reproductor from './src/screens/Reproductor';
import DetalleMemoria from './src/screens/DetalleMemoria';
import { HomeProps } from './src/screens/Home';
import { RootStackParamList } from './src/utils/types';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function Movible() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => (
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon name="search" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={Movible}
          options={{ title: 'Tus memorias musicales', headerShown: false }}
        />
        <Stack.Screen
          name="Reproductor"
          component={Reproductor}
        />
        <Stack.Screen
          name="DetalleMemoria"
          component={DetalleMemoria}
        />
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Search'}
          component={Search}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
