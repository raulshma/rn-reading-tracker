import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Logout } from './Logout';

const Settings = () => {
  return (
    <View style={styles.main}>
      <Logout />
    </View>
  );
};

export { Settings };

const styles = StyleSheet.create({
  main: {
    top: Number(StatusBar.currentHeight) + 20,
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
