import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

// Screen Imports
import { TabBar } from './custom/TabBar';
import { AddBook } from '../screens/Book';
import { Settings } from '../screens/Settings';
import { LoggedInStack } from './LoggedIn';

const Tab = createBottomTabNavigator();
function homeFlow() {
  return (
    <Tab.Navigator tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
      <Tab.Screen name="home" component={LoggedInStack} />
      {/* <Tab.Screen name="details" component={BookDetails} /> */}
      {/* <Tab.Screen name="information-outline" component={About} /> */}
      <Tab.Screen name="plus-circle" component={AddBook} />
      <Tab.Screen name="settings" component={Settings} />
    </Tab.Navigator>
  );
}

export { homeFlow };
