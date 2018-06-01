/* @flow */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';
import { COLORS, ICONS } from '../constants';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const { width, height } = Dimensions.get('window');
const brandBarHeight = 9;
const screenHorizontalPadding = 50;

class Grid6 extends Component {
  state = {
    imgHeight: height - 181,
    imgWidth: width
  };
  componentWillMount() {
    const { width, height } = resolveAssetSource(ICONS.GRID_6CUBES);
    const screenWidth = Dimensions.get('window').width;
    const scaleFactor = width / screenWidth;
    const imageHeight = height / scaleFactor;

    this.setState({ imgWidth: screenWidth, imgHeight: imageHeight - 150 });
  }
  render() {
    const { children } = this.props;
    return (
      <View style={styles.conatiner}>
        <View style={styles.grid}>
          <View style={styles.logoContainer}>
            <Image source={ICONS.LOGO} style={styles.logo} />
          </View>

          <View style={styles.cubeContainer}>
            <Image source={ICONS.GRID_6CUBES} style={[styles.cube, { width: '100%', height: height - 205 }]} />
          </View>

          {children}
        </View>
        <View style={styles.footerContainer}>
          <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1
  },
  grid: {
    flex: 1,
    marginHorizontal: 25,
    marginBottom: 25 + brandBarHeight
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    padding: 0
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.43,
    marginRight: -1
  },
  cubeContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cube: {},
  footerContainer: {
    position: 'absolute',
    bottom: -5
  },
  brandBar: {
    width: width,
    resizeMode: 'contain'
  }
});

export default Grid6;
