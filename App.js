import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';

import Settings from './classes/Settings';
import * as SpotifyToken from './classes/Spotify';

import { DatePicker } from 'native-base';

import * as AuthSession from 'expo-auth-session';

const Stack = createStackNavigator();

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  const [targetBPM, setTargetBPM] = React.useState(100);

  const [access, setAccess] = React.useState(false);

  const [playlist, setPlaylist] = React.useState(null);

  const [device, setDevice] = React.useState(null);

  const value = { targetBPM, setTargetBPM, access, setAccess, playlist, setPlaylist, device, setDevice }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Settings.Provider value = {value}>
        <View style={styles.container}>
          <NavigationContainer linking={LinkingConfiguration}>
            <Stack.Navigator>
              <Stack.Screen name="Root" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Settings.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
