import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import 'react-native-gesture-handler';
import TusMemoriasMusicales from './src/screens/TusMemoriasMusicales';
import Reproductor from './src/screens/Reproductor';
import DetalleMemoria from './src/screens/DetalleMemoria';
import Search from './src/screens/Search';
import { RootStackParamList } from './src/utils/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

//        <Tab.Screen name="Home" component={TusMemoriasMusicales} />

const App = () => {
  function Movible() {
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
// options={{
//  headerShown: false,
//}}
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
          name="DetalleMemoria"
          component={DetalleMemoria}/>
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
