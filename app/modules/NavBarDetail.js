'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { ICONS, FONTS, COLORS } from '../constants';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import SupText from '../utils/SupText';

class NavBar extends Component {
  static defaultProps = {
    rightButton: false,
    titleStyle: {},
  };
  render() {
    const { rightButton, titleStyle, supText, title } = this.props;
    return (
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            if (typeof this.props.onBack === 'function') this.props.onBack();
          }}
          activeOpacity={1}>
          <Image source={ICONS.BACK_ARROW} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <SupText
            textStyle={[styles.title, titleStyle, { fontFamily: FONTS.FONT_BOLD, fontSize: 18 }]}
            supStyle={[{ fontFamily: FONTS.FONT_BOLD, fontSize: 11, color: COLORS.BLUE }]}
            style={styles.unitItem}
            text={applyLetterSpacing(title, Platform.select({ ios: 5, android: 2 }))}
            sup={supText ? '2' : null}
          />
        </View>
        {rightButton && (
          <TouchableOpacity
            style={[styles.iconContainer, { alignItems: 'flex-end', paddingRight: 18 }]}
            onPress={() => {
              if (typeof this.props.onRight === 'function') this.props.onRight();
            }}>
            <Image source={ICONS.SHARE} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const centerWidth = width - 130;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 25,
  },
  titleContainer: {
    width: centerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  title: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 27,
    color: COLORS.BLUE,
  },
  rightContainer: {
    width: 50,
  },
});

export default NavBar;
