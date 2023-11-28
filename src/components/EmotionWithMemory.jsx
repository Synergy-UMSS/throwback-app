import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Emocion from './Emotion';
import PreviewMemory from './PreviewMemory';
import Spacer from './Spacer';

const EmotionWithMemory = ({ memoria, song, onPress, index, alignment, emotion }) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => onPress(memoria.id)}>
      <View style={styles.container}>
        {alignment === 'right' && (
          <>
            <Emocion nombre={memoria.emotion} />
            <Spacer />
          </>
        )}
        <PreviewMemory memoria={memoria} song={song} onPress={onPress} index={index} emotion={memoria.emotion} style={styles.previewMemory} />
        {alignment === 'left' && (
          <>
            <Spacer />
            <Emocion nombre={memoria.emotion} />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 35,
  },
  previewMemory: {
    flex: 0.7,
  },
});

export default EmotionWithMemory;