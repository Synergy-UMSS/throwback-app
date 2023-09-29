import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import 'react-native-gesture-handler';
import Search from './src/screens/Search';
import { RootStackParamList } from './src/utils/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

import MemoryList from './src/screens/MemoryList';
import Reproductor from './src/screens/Reproductor';
import MemoryDetail from './src/screens/MemoryDetail';

const App = () => {
  function Movible() {
    return (
      <Tab.Navigator>
        <Tab.Screen
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
            tabBarLabel: 'Inicio',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
            headerShown: true,
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
        <Stack.Screen
          name="Reproductor"
          component={Reproductor} />
        <Stack.Screen
          name="MemoryDetail"
          component={MemoryDetail}/>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'Search'}
          component={Splash}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
