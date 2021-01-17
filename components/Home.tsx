import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import About from '../screens/About';
import LoggedIn from '../screens/LoggedIn';
import Logout from '../screens/Logout';
import { TabBar } from './custom/TabBar';
import BookDetails from '../screens/BookDetails';

const Tab = createBottomTabNavigator();
function homeFlow() {
  return (
    <Tab.Navigator
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <Tab.Screen name="home-variant-outline" component={LoggedIn} />
      {/* <Tab.Screen name="details" component={BookDetails} /> */}
      {/* <Tab.Screen name="information-outline" component={About} /> */}
      <Tab.Screen name="logout" component={Logout} />
    </Tab.Navigator>
  );
}

export { homeFlow };
