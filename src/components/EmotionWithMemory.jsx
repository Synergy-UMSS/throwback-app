import React from 'react';
import { View, StyleSheet } from 'react-native';
import Emocion from './Emotion';
import PreviewMemory from './PreviewMemory';
import Spacer from './Spacer'

const EmotionWithMemory = ({ memoria, onPress, index, alignment }) => {
    return (
        <View style={styles.container}>
            {alignment === 'right' && <>
            <Emocion nombre={'genial'} />
            <Spacer />
        </>}
            <PreviewMemory memoria={memoria} onPress={onPress} index={index} style={styles.previewMemory} />
            {alignment === 'left' && <>
            <Spacer />
            <Emocion nombre={'angry'} />
        </>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingBottom:35
    },
    emotion: {
        // flex: 0.3
    },
    previewMemory: {
        flex: 0.7,
    }
});

export default EmotionWithMemory;
