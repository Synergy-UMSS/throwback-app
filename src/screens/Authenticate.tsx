import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function Authenticate(props) {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={styles.googleSignInButton}
        onPress={props.handleGoogleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleSignInButton: {
    width: 192, // Ajusta el ancho según tus preferencias
    height: 48, // Ajusta la altura según tus preferencias
  },
});
