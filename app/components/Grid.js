/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { COLORS, ICONS } from '../constants';
const { width } = Dimensions.get('window');

const Layout = ({ children }) => {
  return (
    <View style={styles.conatiner}>
      <View style={styles.grid}>
        <View style={styles.logoContainer}>
          <Image source={ICONS.LOGO} style={styles.logo} />
        </View>
        {children}
      </View>
      <View style={styles.footerContainer}>
        <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  grid: {
    flex: 1,
    marginHorizontal: 25,
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
  footerContainer: {
    position: 'absolute',
    bottom: -5,
  },
  brandBar: {
    width: width,
    resizeMode: 'contain',
  },
});

export default Layout;
