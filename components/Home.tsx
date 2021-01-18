import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// Screen Imports
import About from '../screens/About';
import LoggedIn from '../screens/LoggedIn';
import { TabBar } from './custom/TabBar';
import BookDetails from '../screens/BookDetails';
import { AddBook } from '../screens/Book';
import { Settings } from '../screens/Settings';

const Tab = createBottomTabNavigator();
function homeFlow() {
  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen name="home" component={LoggedIn} />
      {/* <Tab.Screen name="details" component={BookDetails} /> */}
      {/* <Tab.Screen name="information-outline" component={About} /> */}
      <Tab.Screen name="plus-circle" component={AddBook} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}

export { homeFlow };
