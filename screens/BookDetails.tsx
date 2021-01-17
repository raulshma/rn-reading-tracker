import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BookDetails({ navigation, route }: any) {
  React.useEffect(() => {
    console.log(route.params)
  }, [route])
  return (
    <View>
      <Text></Text>
    </View>
  );
}

const styles = StyleSheet.create({});
