import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Loading } from './common/Loading';

interface RegistractionProps {
  authSwitch: any;
  jwt: any;
}

const Registration = ({ authSwitch, jwt }: RegistractionProps) => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <React.Fragment>
      <Animated.View style={{ ...styles.form, opacity: fadeAnim }}>
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

        <Text style={styles.errorTextStyle}>{error}</Text>

        <Button mode="contained" loading={loading}>
          Register
        </Button>
      </Animated.View>
      <Button style={{ marginTop: 10 }} onPress={authSwitch}>
        Already have an account? Log In!
      </Button>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  form: {
    width: '70%',
  },
  text: { backgroundColor: 'white' },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
});

export { Registration };
