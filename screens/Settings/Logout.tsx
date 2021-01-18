import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Context as AuthContext } from '../../context/AuthContext';

function Logout() {
  const { signout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        labelStyle={styles.buttonLabel}
        contentStyle={styles.buttonContent}
        mode="contained"
        onPress={signout}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  button: {
    height: 60,
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 6,
  },
  buttonContent: {
    height: '100%',
  },
  buttonLabel: {
    fontSize: 18,
  },
});

export { Logout };
