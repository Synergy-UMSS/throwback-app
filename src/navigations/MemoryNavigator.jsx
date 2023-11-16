/* eslint-disable prettier/prettier */
import React from 'react';
import MemoryList from '../screens/MemoryList';
import MemoryDetail from '../screens/MemoryDetail';
import {Stack} from '../../App';
import EditMemory from '../screens/EditMemory';


export function MemoryNavigator() {
  // Navigation from home
  return (
    <Stack.Navigator
    
    >
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
          cardStyle: {backgroundColor: '#e4e6dc'},
        }}
      />

      <Stack.Screen
        name="MemoryDetail"
        component={MemoryDetail}
        options={{
          title: 'ui',
          headerStyle: {
            // backgroundColor: '#e4e6dc',
            backgroundColor: 'd',
          },
          // cardStyle: {backgroundColor: '#e4e6dc'},
          cardStyle: {backgroundColor: 'transparent'},
        }}
      />
    </Stack.Navigator>
  );
}
