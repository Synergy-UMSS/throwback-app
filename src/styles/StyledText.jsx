import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
    },
    bold: {
        fontWeight: "bold",
    },
    grey: {
        color: "grey",
    },
    big: {
        fontSize: 20,
    },
    small: {
        fontSize: 10,
    },
});

export default function StyledText ({blue, bold, big, small, children}) {
    const textStyle = [
        styles.text,
        blue && styles.blue,
        bold && styles.bold,
        big && styles.big,
        small && styles.small,
    ];
    <StyledText blue bold big>Un texto</StyledText>;
    return <Text style={textStyle}>{children}</Text>;
}