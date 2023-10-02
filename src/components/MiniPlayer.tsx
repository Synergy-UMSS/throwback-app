import React from 'react';
import {
  View,
  Modal,
  Button,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Player from '../screens/Player';

const MiniPlayer = ({navigation}) => {
  return (
    <View style={style.maincontainer}>
      <TouchableOpacity
        style={style.container}
        onPress={() => navigation.navigate(Player)}>
        <Text> Reproduciendo canción </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MiniPlayer;

const style = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    bottom: Dimensions.get('window').height * -1 + 100,
  },
});
