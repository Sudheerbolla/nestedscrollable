'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ICONS, FONTS, COLORS } from '../constants';
const { width } = Dimensions.get('window');

class NavBar extends Component {
  static defaultProps = {
    rightButton: false,
    titleStyle: {},
  };
  render() {
    const { rightButton, titleStyle } = this.props;
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
          <Text style={[styles.title, titleStyle]}>{this.props.title}</Text>
        </View>
        {rightButton && (
          <TouchableOpacity
            style={[styles.iconContainer, { alignItems: 'flex-end', paddingRight: 15 }]}
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

const centerWidth = width - 130;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    top: -10,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 25,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: centerWidth,
  },
  title: {
    fontWeight: '900',
    // fontFamily: FONTS.FONT_BOLD,
    fontSize: 29,
    color: COLORS.BLUE,
  },
  rightContainer: {
    width: 50,
  },
});

export default NavBar;
