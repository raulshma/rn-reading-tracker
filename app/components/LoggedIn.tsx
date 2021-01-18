import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ListBook, BookDetails } from '../screens/Book';

const Stack = createStackNavigator();

function LoggedInStack({ navigation }: any) {
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName="Listbooks">
        <Stack.Screen
          name="Listbooks"
          options={{ headerShown: false }}
          component={ListBook}
        />
        <Stack.Screen
          name="BookDetails"
          options={{ headerTitle: 'Details' }}
          component={BookDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { LoggedInStack };
