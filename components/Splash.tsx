import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

function splashFlow() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} size="large" color={Colors.red800} />
    </View>
  );
}
export { splashFlow };
