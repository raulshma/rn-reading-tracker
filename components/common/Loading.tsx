import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface LoadingProps {
  size: string;
}

const Loading = ({ size }: LoadingProps) => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: -1,
    marginTop: 12,
    marginBottom: 12,
  },
});

export { Loading };
