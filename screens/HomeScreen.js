import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';
import { BaseRouter } from '@react-navigation/native';

import Settings from '../classes/Settings';
import * as Spotify from '../classes/Spotify';

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

const PlayButton = () => {
  const {device} = React.useContext(Settings)
  const [icon, setIcon] = React.useState('md-play');
  return (
    <RectButton style={{marginTop:200, width:70, height:70}}
      onPress = {() => {
        if (!(device === null)) {
          console.log(device);
          if (icon === 'md-play') {
            setIcon('md-pause')
            Spotify.playMusic(device);
          }
          else {
            setIcon('md-play')
            Spotify.pauseMusic(device);
          }
        }
      }}
    >
      <View style={{marginLeft: 15}}>
        <Ionicons name={icon} size={70} color="rgba(0,0,0,1)" />
      </View>
    </RectButton>
  )
}

const HomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 100, alignItems: 'center'}}>
        <CurrentBPM/>
        <CurrentTarget/>
        <PlayButton/>
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
