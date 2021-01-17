import React from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import featherClient from '../services/client';

interface LoginProps {
  authSwitch: any;
  jwt: any;
}

const Login = ({ authSwitch, jwt }: LoginProps) => {
  const [email, setEmail] = React.useState<string>('me@raulshma.xyz');
  const [password, setPassword] = React.useState<string>('123');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  const login = () => {
    setLoading(true);
    featherClient
      .authenticate({
        strategy: 'local',
        email,
        password,
      })
      .then((e) => {
        setEmail('');
        setPassword('');
        jwt('ok');
      })
      .catch((e) => {
        setDialogVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Animated.View style={{ ...styles.form, opacity: fadeAnim }}>
        <TextInput
          style={styles.text}
          mode="outlined"
          placeholder="user@email.com"
          label="Email"
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />

        <TextInput
          style={styles.text}
          mode="outlined"
          secureTextEntry
          placeholder="password"
          label="Password"
          value={password}
          onChangeText={(password: string) => setPassword(password)}
        />

        <Button
          style={{ marginTop: 10 }}
          mode="contained"
          loading={loading}
          onPress={login}
        >
          Login
        </Button>
      </Animated.View>
      <Button style={{ marginTop: 10 }} onPress={authSwitch}>
        Don't have an account? Register!
      </Button>
      <Portal>
        <Dialog
          visible={dialogVisible}
          onDismiss={() => setDialogVisible(!dialogVisible)}
        >
          <Dialog.Title>Login failed</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Invalid credentials try again</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(!dialogVisible)}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '70%',
  },
  text: { backgroundColor: 'white' },
});

export { Login };
