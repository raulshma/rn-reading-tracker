import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import featherClient from './services/client';
import Auth from './screens/Auth';
import LoggedIn from './screens/LoggedIn';

export default function App() {
  const [jwt, setJwt] = React.useState<String>('');

  React.useEffect(() => {
    featherClient
      ?.reAuthenticate()
      .then(() => {
        console.log('test');
        setJwt('ok');
      })
      .catch(() => {
        setJwt('');
      });
  }, []);
  if (!jwt) {
    return <Auth jwt={setJwt}/>;
  } else if (jwt) {
    return <LoggedIn jwt={setJwt} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
