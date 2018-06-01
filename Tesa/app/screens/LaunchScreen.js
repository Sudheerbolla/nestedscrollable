'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

export default class LaunchScreen extends Component {
  render() {
    return (
      <Layout>
        <View style={styles.overlayImage}>
          <Image source={ICONS.LAUNCH_SYMBOL} style={styles.rulerImage} />
        </View>
        <View>
          <Image source={ICONS.TAPE_CALCULATOR} style={styles.imageStyles} />
        </View>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.rowLabel}>{applyLetterSpacing(i18n.t('general.calculate').toUpperCase(), 1)}</Text>
            <Text style={styles.rowLabel}>{applyLetterSpacing(i18n.t('general.converter').toUpperCase(), 1)}</Text>
            <Text style={styles.rowLabel}>{applyLetterSpacing(i18n.t('general.calculator').toUpperCase(), 1)}</Text>
          </View>
          <View style={styles.overlayArrowImage}>
            <Image source={ICONS.ARROW_BENEFIT} style={styles.arrowImage} />
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  imageStyles: {
    resizeMode: 'contain',
    width: width - 31,
    top: 11,
    left: -6,
  },
  overlayImage: {
    position: 'absolute',
    left: -32,
    top: -15,
  },
  rulerImage: {
    height: height,
    resizeMode: 'contain',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  rowItem: {
    width: width,
    height: width,
    paddingRight: 80,
    paddingBottom: 35,
    justifyContent: 'flex-end',
  },
  rowLabel: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 28,
    textAlign: 'right',
    marginBottom: -5,
  },
  overlayArrowImage: {
    position: 'absolute',
    bottom: 20,
    right: -26,
  },
  arrowImage: {
    resizeMode: 'contain',
    width: width / 4.9,
    height: width / 4.9,
    marginBottom: 15,
  },
});
