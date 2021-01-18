import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors, useTheme } from 'react-native-paper';

function splashFlow() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} size="large" color={colors.primary} />
    </View>
  );
}
export { splashFlow };
