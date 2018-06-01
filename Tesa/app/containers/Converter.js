'use strict';

import React, { Component } from 'react';

import { Platform, StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Grid, ImageButton } from '../components';
import NavBar from '../modules/NavBar';
import { COLORS, ICONS, FONTS } from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

class Converter extends Component {
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
        <View styles={styles.conatiner}>
          <View style={styles.row}>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('ConverterArea', {
                    title: i18n.t('converter_area.area').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_1}
                title={i18n.t('converter_area.area').toUpperCase()}
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
                  this.props.navigation.navigate('ConverterLength', {
                    title: i18n.t('converter_length.length').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_2}
                title={i18n.t('converter_length.length').toUpperCase()}
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
                  this.props.navigation.navigate('ConverterThickness', {
                    title: i18n.t('converter_thickness.thickness').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_3}
                title={i18n.t('converter_thickness.thickness').toUpperCase()}
              />
            </View>
            <View style={{
                width: 1,
                backgroundColor: '#000000'
              }}/>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('ConverterMass', {
                    title: i18n.t('converter_mass.mass').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_4}
                title={i18n.t('converter_mass.mass').toUpperCase()}
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
                  this.props.navigation.navigate('ConverterForce', {
                    title: i18n.t('converter_force.force').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_5}
                title={i18n.t('converter_force.force').toUpperCase()}
              />
            </View>
            <View style={{
                width: 1,
                backgroundColor: '#000000'
              }}/>
            <View style={styles.column}>
              <ImageButton
                onPress={() =>
                  this.props.navigation.navigate('ConverterPrice', {
                    title: i18n.t('converter_price.price').toUpperCase()
                  })
                }
                image={ICONS.B_ICON_6}
                title={i18n.t('converter_price.price').toUpperCase()}
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
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    width: columnWidth,
    height: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: Platform.select({ ios: 0, android: -15 }),
  }
});

export default Converter;
