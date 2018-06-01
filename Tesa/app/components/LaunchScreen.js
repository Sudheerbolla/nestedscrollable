'use strict';

import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Grid from '../components/Grid';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

export default class LaunchScreen extends Component {
  render() {
    return (
      <View style={styles.conatiner}>
        <View style={styles.launchContainer}>
          <Image source={ICONS.LAUNCH_SYMBOL} style={styles.launchSymbol} />
        </View>
        <Grid>
          <View style={styles.tapeContainer}>
            <Image source={ICONS.TAPE_CALCULATOR} style={styles.tapeIcon} />
          </View>

          <View style={{ flex: 1 }} />

          <View style={styles.arrowContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{applyLetterSpacing(i18n.t('launchingscreen.calculate').toUpperCase(), 1)}</Text>
              <Text style={styles.label}>{applyLetterSpacing(i18n.t('launchingscreen.convert').toUpperCase(), 1)}</Text>
              <Text style={styles.label}>{applyLetterSpacing(i18n.t('launchingscreen.calculator').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Image source={ICONS.ARROW_BENEFIT} style={styles.arrowIcon} />
            </View>
          </View>

          <View style={{ height: 60 }} />
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  launchContainer: {
    position: 'absolute',
    left: -32,
    top: -25,
  },
  launchSymbol: {
    height: height,
    resizeMode: 'contain',
  },
  tapeContainer: {
    top: -3,
  },
  tapeIcon: {
    resizeMode: 'contain',
    width: '100%',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  labelContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  label: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 22,
    textAlign: 'right',
    marginRight: 25,
  },
  iconContainer: {
    position: 'absolute',
    top: 4,
    right: -8,
    alignItems: 'center',
  },
  arrowIcon: {
    resizeMode: 'contain',
    height: 70,
  },
});
