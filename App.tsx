import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Splash from './src/screens/Splash';
import {RootStackParamList} from './src/utils/types';
import 'react-native-gesture-handler';
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App = () => {
  function Movible(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Home"
          component={Movible}
          options={{headerShown: false}}
        />
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
