const EmotionMemory = ({ emocion, memoria }) => {
    return (
        <View style={styles.emotionMemoryContainer}>
            <Emocion nombre={emocion} />
            <PreviewMemory memoria={memoria} />
        </View>
    );
};