import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface RegistractionProps {
  navigation: any;
}

const Registration = ({ navigation }: RegistractionProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <View style={{ ...styles.form }}>
        <TextInput
          style={styles.text}
          mode="outlined"
          label="Email"
          value={email}
          onChangeText={(email: string) => setEmail(email)}
        />
        <TextInput
          style={styles.text}
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

        <Button
          style={{
            marginTop: 10,
            height: 55,
            justifyContent: 'center',
          }}
          labelStyle={{ fontSize: 22 }}
          mode="contained"
        >
          Register
        </Button>
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
  text: { backgroundColor: 'rgba(0,0,0,0)' },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
});

export { Registration };
