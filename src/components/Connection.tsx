import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useConnectionGlobal } from '../helpcomponents/connectionGlobal';

const Connection = () => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    message: {
      textAlign: 'center',
      fontFamily: 'Arial',
    },
  });

  const { isConnected, setIsConnected } = useConnectionGlobal();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return unsubscribe;
  }, [setIsConnected]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isConnected ? '#00FF0000' : '#50505061',
        },
      ]}
    >
      <Text style={styles.message}>
        {isConnected
          ? ''
          : 'No es posible reproducir la música debido a\n problemas de conectividad.'}
      </Text>
    </View>
  );
};

export default Connection;