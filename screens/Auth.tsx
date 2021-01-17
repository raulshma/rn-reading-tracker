import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-native-paper';
import { Registration, Login } from '../components';

export default function Auth({ jwt }: any) {
  const [showLogin, setShowLogin] = React.useState<Boolean>(false);

  const authSwitch = () => {
    setShowLogin(!showLogin);
  };
  const whichForm = () => {
    if (!showLogin) {
      return <Login jwt={jwt} authSwitch={authSwitch} />;
    } else {
      return <Registration jwt={jwt} authSwitch={authSwitch} />;
    }
  };
  return (
    <Provider>
      <View style={styles.container}>{whichForm()}</View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
