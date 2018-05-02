'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback, BackHandler } from 'react-native';
import { Grid, ImageButton } from '../components';
import NavBar from '../modules/NavBar';
import { COLORS, ICONS, FONTS } from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

export default class Calculation extends Component {

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Grid>
        <NavBar
          onBack={() => {
            this.props.navigation.goBack();
          }}
          title={params.title}
        />
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={[styles.column]}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('CalculationArea', {
                    title: i18n.t('calculation_area.area').toUpperCase(),
                  })
                }
                image={ICONS.A_ICON_1}
                title={i18n.t('calculation_area.area').toUpperCase()}
              />
            </View>
            <View style={{
                width: 1,
                marginTop: 5,
                backgroundColor: '#000000'
              }}/>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('CalculationLength', {
                    title: i18n.t('calculation_length.length').toUpperCase(),
                  })
                }
                image={ICONS.A_ICON_2}
                title={i18n.t('calculation_length.length').toUpperCase()}
              />
            </View>
          </View>
          <View style={{
              height: 1,
              marginLeft: 5,
              marginRight: 5,
              backgroundColor: '#000000'
            }}/>
          <View style={styles.row}>
            <View style={[styles.column]}>
              <ImageButton
                onPress={() => this.props.navigation.navigate('CalculationDiameter')}
                image={ICONS.A_ICON_3}
                title={i18n.t('calculation_diameter.diameter').toUpperCase()}
                titleStyle={{ fontSize: 14 }}
              />
            </View>
            <View style={{
                width: 1,
                backgroundColor: '#000000'
              }}/>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('CalculationConsumption', {
                    title: i18n.t('calculation_consumptation.consumptation').toUpperCase(),
                  })
                }
                image={ICONS.A_ICON_4}
                title={i18n.t('calculation_consumptation.consumptation').toUpperCase()}
              />
            </View>
          </View>
          <View style={{
              height: 1,
              marginLeft: 5,
              marginRight: 5,
              backgroundColor: '#000000'
            }}/>
          <View style={styles.row}>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('CalculationPrice', {
                    title: i18n.t('calculation_price.price_roll').toUpperCase(),
                  })
                }
                image={ICONS.A_ICON_5}
                title={i18n.t('calculation_price.price_roll').toUpperCase()}
              />
            </View>
            <View style={{
                width: 1,
                backgroundColor: '#000000'
              }}/>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('CalculationPriceM2', {
                    title: i18n.t('calculation_price_m2.price_m2').toUpperCase(),
                  })
                }
                supText={true}
                image={ICONS.A_ICON_6}
                title={i18n.t('calculation_price_m2.price_m2').toUpperCase()}
              />
            </View>
          </View>
        </View>
      </Grid>
    );
  }

}

const { width } = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    width: columnWidth,
    height: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: -15,
  },
});
