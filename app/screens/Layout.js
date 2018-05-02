'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { COLORS, ICONS } from '../constants';
const { width } = Dimensions.get('window');

const Layout = ({ children }) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.logoContainer}>
        <Image source={ICONS.LOGO} style={styles.logo} />
      </View>
      {children}
      <View style={styles.clearFix} />
      <View style={styles.row}>
        <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 22,
  },
  row: {
    position: 'absolute',
    bottom: -4,
  },
  clearFix: {
    height: 15,
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.43,
    marginRight: -1,
  },
  brandBar: {
    width: width,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    padding: 0,
  },
});

export default Layout;
