/* @flow */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import SupText from '../utils/SupText';

const ImageButton = ({ onPress, image, title, titleStyle, supText }) => {
  const space = Platform.select({ ios: 5, android: 2 });
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.labelContainer}>
          <SupText
            textStyle={[styles.label, titleStyle, { fontFamily: FONTS.FONT_BOLD, fontSize: 18 }]}
            supStyle={[{ fontFamily: FONTS.FONT_BOLD, fontSize: 11, color: COLORS.DARK_GREY }]}
            style={styles.unitItem}
            text={applyLetterSpacing(title, space)}
            sup={supText ? '2' : null}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

ImageButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const { width } = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    top: -3,
  },
  labelContainer: {
    flex: 1,
    marginTop: columnWidth / 1.6,
    alignItems: 'center',
  },
  label: {
    // width: 118,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 15,
    textAlign: 'center',
    color: COLORS.DARK_GREY,
  },
});

export default ImageButton;
