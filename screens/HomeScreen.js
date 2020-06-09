import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { MonoText } from '../components/StyledText';
import { BaseRouter } from '@react-navigation/native';

import Settings from '../classes/Settings';

var bpm = 80;

var test = false;

function update_bpm () {
  if (Math.random() * 10 < 5) {
    bpm = bpm + 1
  }
  else {
    bpm = bpm - 1
  }
  return bpm
}

const CurrentBPM = () => {
  const [lbpm, setLbpm] = React.useState(bpm);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLbpm(update_bpm());
    }, 500);
    return () => clearInterval(interval);
  });

  return (
      <Text style={{fontSize: 52, color: 'black'}}>
        {lbpm} BPM
      </Text>
  );
};

const CurrentTarget = () => {
  const { targetBPM } = React.useContext(Settings)

  return (
    <Text style={styles.lessEmph}>
      Current Target: {targetBPM}
    </Text> 
  );
};

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <CurrentBPM/>
        <CurrentTarget/>
      </View>
    </View>
  );
};

export default HomeScreen;

// Removes header from screen
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  lessEmph: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
});
