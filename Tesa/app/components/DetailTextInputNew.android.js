import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Platform
} from 'react-native';
import {COLORS, ICONS, FONTS} from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const space = Platform.select({ios: 5, android: 2});

const DetailTextInput = ({value, onChangeText, title}) => {
  return (<View>
    <Text style={styles.label}>{applyLetterSpacing(title, space)}</Text>
    <TextInput
      underlineColorAndroid="rgba(0,0,0,0)"
      keyboardType={'numeric'}
      returnKeyType="done"
      style={styles.input}
      value={value}
      onChangeText={onChangeText} />
  </View>);
};

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  label: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 15,
    color: COLORS.DARK_GREY
  },
  input: {
    height: 42,
    backgroundColor: COLORS.BLUE_3,
    color: COLORS.BLUE,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default DetailTextInput;
