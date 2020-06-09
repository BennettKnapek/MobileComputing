import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TextInput, AsyncStorage} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import Settings from '../classes/Settings';
import * as Spotify from '../classes/Spotify';

function getIcon (access) {
  if (access) {
    return 'md-checkmark';
  }
  else {
    return 'md-log-in';
  }
}

const SettingsScreen = ({ navigation, route }) => {
  const { targetBPM, setTargetBPM, access, setAccess} = React.useContext(Settings);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionInputNumeric
        label="Target Heartrate (BPM)"
        value={targetBPM.toString()}
        onChangeText={text => setTargetBPM(parseInt(text))}
      />
      <OptionButton
        label="Connect to Spotify"
        icon={getIcon(access)}
        onPress={() => {
          Spotify.refreshIfNeeded(setAccess);
        }}/>
        <OptionButton
        label="Check if works"
        icon={'md-book'}
        onPress={() => {
          Spotify.getUserPlaylists();
        }}
        isLastOption/>
    </ScrollView>
  );
}

export default SettingsScreen;

function OptionInputNumeric({ label, isLastOption, onChangeText, value}) {
  return (
    <View style={[styles.option, isLastOption && styles.lastOption]}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{flex:1}}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
        <TextInput style={styles.optionInput}
          defaultValue={value}
          onChangeText = {onChangeText}
          keyboardType="numeric"/>
      </View>
    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer, {marginTop: 5, marginRight: 5}}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

function PlaylistSelect() {
  return (
    null
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  optionInput: {
    flex: 1,
    padding:3,
    borderColor: 'black',
    borderWidth: 1
  },
  optionIconContainer: {
    marginRight: 12,
  },

  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 5
  },
});
