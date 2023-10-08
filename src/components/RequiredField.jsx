import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RequiredField = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{children}</Text>
      <Text style={styles.asterisk}>*</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  asterisk: {
    fontSize: 16,
    color: 'red',
  },
});

export default RequiredField;

