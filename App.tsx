import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import {Easing} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateMemory from './src/screens/CreateMemory';
import Reproductor from './src/screens/Reproductor';
import MemoryList from './src/screens/MemoryList';
import Player from './src/screens/Player';
import Search from './src/screens/Search';
import Splash from './src/screens/Splash';
import Playlist from './src/screens/Playlist';
import Library from './src/screens/Library';
import {MusicPlayerProvider} from './src/components/MusicPlayerContext';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RootStackParamList} from './src/utils/types';
import MemoryDetail from './src/screens/MemoryDetail';
const Stack = createStackNavigator<RootStackParamList>();
import {MenuProvider} from 'react-native-popup-menu';
import LinearGradient from 'react-native-linear-gradient';
import SearchSelect from './src/screens/SearchSelect';
import {Image, View} from 'react-native'; 
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MemoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              opacity: current.progress, // Anima la opacidad
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height * 0.3, 0],
                  }),
                },
              ],
            },
          };
        },
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 150,
              easing: Easing.ease,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 150,
              easing: Easing.ease,
            },
          },
        },
      }}>
      <Stack.Screen
        name="Tus Memorias Musicales"
        component={MemoryList}
        options={{
          headerStyle: {
            backgroundColor: '#e4e6dc',
          },
          headerTitleStyle: {
            fontSize: 22,
            color: 'black',
            fontFamily: 'arial-bold',
            marginLeft: 0,
          },
          headerShown: false,
          cardStyle: {backgroundColor: '#e4e6dc'},
        }}
      />
      <Stack.Screen name="Reproductor" component={Reproductor} />
      <Stack.Screen
        name="MemoryDetail"
        component={MemoryDetail}
        options={{
          headerShown: true,
          title: ' ',
          headerTransparent: true,
          headerTintColor: 'black',
        }}
      />
    </Stack.Navigator>
  );
}

const App = () => {
  function Movible() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarBackground: () => (
            <LinearGradient
              // colors={['rgba(120, 116, 116, 0.1)', 'rgba(38, 38, 38, 1)']}
              colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -1,
                height: 51,
              }}
            />
          ),
          tabBarActiveTintColor: '#ffffff',
          // tabBarInactiveTintColor: '#e4e6dc',
          tabBarInactiveTintColor: '#CECFC8',
          tabBarStyle: {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
            borderColor: 'black',
            position: 'absolute',
            elevation: 0,
          },
        })}
        // // // //
        // screenOptions={{
        //   tabBarActiveTintColor: '#ffffff',
        //   tabBarInactiveTintColor: '#b5b3b3',
        //   tabBarStyle: {
        //     backgroundColor: '#787474',
        //     // backgroundColor: 'transparent',
        //   },
        // }}
      >
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
              <FontAwesomeIcon name="search" color={color} size={size-3} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Library"
          component={Library}
          options={{
            tabBarLabel: 'Tu Biblioteca',
            tabBarIcon: ({color, size}) => (
              <View style={{ borderRadius: 7 / 2, overflow: 'hidden' }}>
              <Image source={require('./src/assets/customIcon/book.png')} style={{ tintColor: color, width: size-4, height: size-4 }} />
            </View>
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={Playlist}
          options={{
            tabBarButton: (props) => null,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SearchSelect"
          component={SearchSelect}
          options={{
            tabBarButton: (props) => null,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <MusicPlayerProvider>
      <MenuProvider>
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
              name="Create"
              component={CreateMemory}
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
              name="SearchSelect"
              component={SearchSelect}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Player"
              component={Player}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateMemory"
              component={CreateMemory}
              options={{headerShown: false}}
            />
            {/*<Stack.Screen
            name="Library"
            component={Library}
            options={{headerShown: false}}
          />*/}
            <Stack.Screen
              name="Playlist"
              component={Playlist}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </MusicPlayerProvider>
  );
};

export default App;