import React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    text: {
        color: "grey",
        fontSize: 12,
        fontWeight: "bold",
    },
    bold: {
        fontWeight: "bold",
    },
    blue: {
        color: "blue",
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

    return <Text style={textStyle}>{children}</Text>;
}