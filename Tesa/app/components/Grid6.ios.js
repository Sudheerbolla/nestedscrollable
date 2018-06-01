/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { COLORS, ICONS } from '../constants';

const Grid6 = ({ children }) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.grid}>
        <View style={styles.logoContainer}>
          <Image source={ICONS.LOGO} style={styles.logo} />
        </View>

        <View style={styles.cubeContainer}>
          <Image source={ICONS.GRID_6CUBES} style={styles.cube} />
        </View>

        {children}
      </View>
      <View style={styles.footerContainer}>
        <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const screenHorizontalPadding = 50;
const brandBarHeight = 9;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  grid: {
    flex: 1,
    marginHorizontal: 25,
    marginBottom: 25 + brandBarHeight,
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    padding: 0,
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.43,
    marginRight: -1,
  },
  cubeContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  cube: {
    resizeMode: 'contain',
    width: '100%',
    height: height - 181,
  },
  footerContainer: {
    position: 'absolute',
    bottom: -5,
  },
  brandBar: {
    width: width,
    resizeMode: 'contain',
  },
});

export default Grid6;
