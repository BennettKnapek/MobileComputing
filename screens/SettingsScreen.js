import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Crnt_Settings from '../classes/Settings';

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionInputNumeric
        label="Target Heartrate (BPM)"
        value={Crnt_Settings.target_bpm.toString()}
        onChangeText={text => Crnt_Settings.target_bpm = parseInt(text)}
        isLastOption
      />
    </ScrollView>
  );
}

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
          keyboardType="numeric"
        />
      </View>
    </View>
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
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 5
  },
});
