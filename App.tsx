import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import featherClient from './services/client';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';
import { Login, Registration } from './components';
import { Provider as AuthProvider } from './context/AuthContext';
import { Context as AuthContext } from './context/AuthContext';
import { Provider } from 'react-native-paper';

const AuthStack = createStackNavigator();
function authFlow() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signin"
        component={Login}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Signup"
        component={Registration}
      />
    </AuthStack.Navigator>
  );
}

function homeFlow() {
  return <LoggedIn />;
}

const Stack = createStackNavigator();
function App() {
  const { state, refresh } = React.useContext(AuthContext);
  React.useEffect(() => {
    refresh();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.user === null ? (
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
      <Provider>
        <App />
      </Provider>
    </AuthProvider>
  );
};
// export default function App() {
//   const [jwt, setJwt] = React.useState<String>('');

//   React.useEffect(() => {
//     featherClient
//       ?.reAuthenticate()
//       .then(() => {
//         console.log('test');
//         setJwt('ok');
//       })
//       .catch(() => {
//         setJwt('');
//       });
//   }, []);
//   if (!jwt) {
//     return <Auth jwt={setJwt} />;
//   } else if (jwt) {
//     return <LoggedIn jwt={setJwt} />;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
