import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as DataProvider } from './context/DataContext';
import { Context as AuthContext } from './context/AuthContext';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { splashFlow, authFlow, homeFlow } from './components';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6369d1',
  },
};

const Stack = createStackNavigator();
function App() {
  const { state, refresh } = React.useContext(AuthContext);
  React.useEffect(() => {
    refresh();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.isRefreshing === true ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={splashFlow}
            />
          </>
        ) : state.user === null ? (
          <>
            <Stack.Screen
              options={{ headerShown: false }}
              name="Auth"
              component={authFlow}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={homeFlow}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <DataProvider>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </DataProvider>
    </AuthProvider>
  );
};
