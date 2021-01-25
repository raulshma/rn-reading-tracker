import React, { useContext } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import client from '../../services/client';
import {
  Button,
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  TextInput,
} from 'react-native-paper';
import { Context as DataContext } from '../../context/AuthContext';

interface RegistractionProps {
  navigation: any;
}

const Registration = ({ navigation }: RegistractionProps) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  const hasConfirmPasswordError = () => {
    return password != confirmPassword;
  };

  const register = () => {
    if (email && password && !hasConfirmPasswordError()) {
      client
        .service('users')
        .create({ strategy: 'local', email, password })
        .then((res: any) => {
          navigation.navigate('Signin');
        })
        .catch((err: any) => {
          setError(err.message);
        });
    }
  };

  return (
    <React.Fragment>
      <View style={{ ...styles.form }}>
        <TextInput
          style={[styles.text, styles.mt]}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />
        <TextInput
          style={[styles.text, styles.mt]}
          mode="outlined"
          secureTextEntry
          label="Password"
          value={password}
          onChangeText={(password: string) => setPassword(password)}
        />
        <TextInput
          style={styles.text}
          mode="outlined"
          secureTextEntry
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(confirm_password: string) =>
            setConfirmPassword(confirm_password)
          }
        />
        <HelperText
          type="error"
          style={styles.pl}
          visible={hasConfirmPasswordError()}
        >
          Passwords do not match!
        </HelperText>

        <Button
          style={styles.button}
          labelStyle={{ fontSize: 22 }}
          mode="contained"
          onPress={register}
        >
          Register
        </Button>
        <HelperText type="error" style={[styles.pl, styles.mt]} visible={true}>
          {error}
        </HelperText>
      </View>
      <Button
        style={{ marginTop: 10 }}
        onPress={() => navigation.push('Signin')}
      >
        Already have an account? Log In!
      </Button>
    </React.Fragment>
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
    borderRadius: 6,
    marginTop: 10,
  },
  text: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  mt: {
    marginBottom: 10,
  },
  pl: {
    paddingLeft: 0,
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
});

export { Registration };
