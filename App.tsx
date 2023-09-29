import React from 'react';

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
      <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#b5b3b3',
            tabBarStyle: {
              backgroundColor: '#787474',
            },
          }}
        >
        <Tab.Screen
          name="Home_memory"
          component={MemoryNavigator}
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
          component={MemoryDetail}
        />
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
function MemoryNavigator() { // Navigation from home
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
                cardStyle: { backgroundColor: '#e4e6dc'
                }
              }}
          />


          <Stack.Screen 
              name="MemoryDetail" 
              component={MemoryDetail} 
              options={{
                title: ' ',
                headerStyle: {
                  backgroundColor: '#e4e6dc'
                },
                cardStyle: { backgroundColor: '#e4e6dc'
                }
              }}
          />
      </Stack.Navigator>
  );
}
export default App;
