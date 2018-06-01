'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

class Converter extends Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Layout>
        <NavBar
          onBack={() => {
            this.props.navigation.goBack();
          }}
          title={params.title}
        />
        <View>
          <View style={styles.overlayImage}>
            <Image source={ICONS.GRID_6CUBES} style={styles.cubeImage} />
          </View>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterArea', {
                  title: applyLetterSpacing(i18n.t('converter_area.area').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_1} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_area.area').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterLength', {
                  title: applyLetterSpacing(i18n.t('converter_length.length').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_2} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_length.length').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterThickness', {
                  title: applyLetterSpacing(i18n.t('converter_thickness.thickness').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_3} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_thickness.thickness').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterMass', {
                  title: applyLetterSpacing(i18n.t('converter_mass.mass').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_4} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_mass.mass').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterForce', {
                  title: applyLetterSpacing(i18n.t('converter_force.force').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_5} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_force.force').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('ConverterPrice', {
                  title: applyLetterSpacing(i18n.t('converter_price.price').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.B_ICON_6} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('converter_price.price').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Layout>
    );
  }
}

const cubeWidth = (width - 30) / 2;
const styles = StyleSheet.create({
  overlayImage: {
    position: 'absolute',
    top: 0,
  },
  cubeImage: {
    width: width - 30,
    height: cubeWidth * 3 - 44,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
  },
  rowItem: {
    width: cubeWidth,
    height: height / 3 - 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 18,
  },
  rowIcon: {
    width: cubeWidth / 2.5,
    height: cubeWidth / 2.5,
    resizeMode: 'contain',
  },
});

export default Converter;
