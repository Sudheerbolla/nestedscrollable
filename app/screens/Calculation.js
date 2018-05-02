'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

class Calculation extends Component {
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
        <View style={styles.container}>
          <View style={styles.overlayImage}>
            <Image source={ICONS.GRID_6CUBES} style={styles.cubeImage} />
          </View>
          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationArea', {
                  title: applyLetterSpacing(i18n.t('calculation_area.area').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_1} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_area.area').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationLength', {
                  title: applyLetterSpacing(i18n.t('calculation_length.length').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_2} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_length.length').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationDiameter', {
                  title: applyLetterSpacing(i18n.t('calculation_diameter.diameter').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_3} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_diameter.diameter').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationConsumption', {
                  title: applyLetterSpacing(i18n.t('calculation_consumptation.consumptation').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_4} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_consumptation.consumptation').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={styles.row}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationPrice', {
                  title: applyLetterSpacing(i18n.t('calculation_price.price_roll').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_5} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_price.price_roll').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate('CalculationPriceM2', {
                  title: applyLetterSpacing(i18n.t('calculation_price_m2.price_m2').toUpperCase()),
                });
              }}>
              <View style={styles.rowItem}>
                <Image source={ICONS.A_ICON_6} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('calculation_price_m2.price_m2').toUpperCase(), 1)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Layout>
    );
  }
}

const cubeWidth = (width - 40) / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayImage: {
    position: 'absolute',
    top: 0,
  },
  cubeImage: {
    width: width - 40,
    height: cubeWidth * 3 - 18,
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

export default Calculation;
