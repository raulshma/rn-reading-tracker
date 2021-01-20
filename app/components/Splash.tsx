import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Colors, useTheme } from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    ...StyleSheet.absoluteFillObject,
  },
});
const SplashFlow = React.memo(() => {
  const { colors } = useTheme();
  return (
    <View style={style.container}>
      <ActivityIndicator animating={true} size="large" color={colors.primary} />
    </View>
  );
});
export { SplashFlow };
