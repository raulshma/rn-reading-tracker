import React, { useContext } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Snackbar,
  TextInput,
} from 'react-native-paper';
import { Context as AuthContext } from '../context/AuthContext';
interface LoginProps {
  navigation: any;
}

const Login = ({ navigation }: LoginProps) => {
  const [email, setEmail] = React.useState<string>('me@raulshma.xyz');
  const [password, setPassword] = React.useState<string>('123');
  const [dialogVisible, setDialogVisible] = React.useState<boolean>(false);

  const { state, signin } = useContext(AuthContext);

  const login = () => {
    signin({ email, password });
  };
  return (
    <>
      <View style={{ ...styles.form }}>
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
          style={styles.button}
          labelStyle={{ fontSize: 22 }}
          mode="contained"
          loading={state.loading}
          onPress={login}
        >
          Login
        </Button>
      </View>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => navigation.push('Signup')}
      >
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
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    height: 55,
    justifyContent: 'center',
  },
  text: { backgroundColor: 'rgba(0,0,0,0)', marginBottom: 10 },
});

export { Login };
