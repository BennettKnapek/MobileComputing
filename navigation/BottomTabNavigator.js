import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import {TabBarIcon, TabBarIconColor} from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. 
  navigation.setOptions({ headerTitle: getHeaderTitle(route), headerShown: getHeaderShown(route)});

  return (
    <BottomTab.Navigator 
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: 'black',
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIconColor focused={focused} name="md-heart" color="#b30000"/>,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabBarIconColor focused={focused} name="md-settings" color="#262729"/>,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Settings':
      return 'Settings';
  }
}

function getHeaderShown(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
  switch (routeName) {
    case 'Home':
      return false;
    case 'Settings':
      return true;
  }
}