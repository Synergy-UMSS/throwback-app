import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import {RootStackParamList} from './src/utils/types';
import 'react-native-gesture-handler';
import TusMemoriasMusicales from './src/screens/TusMemoriasMusicales';
import Reproductor from './src/screens/Reproductor';
import DetalleMemoria from './src/screens/DetalleMemoria';
//import
//
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App = () => {
  function Movible(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={TusMemoriasMusicales} />
      </Tab.Navigator>
    );
  }

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
          component={Reproductor} />
        <Stack.Screen
          name="DetalleMemoria"
          component={DetalleMemoria}/>
        <Stack.Screen
          name={'Splash'}
          component={Splash}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
