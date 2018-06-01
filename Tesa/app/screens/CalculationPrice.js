'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: 'pro m',
      priceValue: '5',
      lengthValue: '66',
      widthValue: '19'
    };
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Layout>
        <NavBar
          onBack={() => {
            this.props.navigation.goBack();
          }}
          title={params.title}
          rightButton={true}
          onRight={() => {
            alert('on Shared');
          }}
        />
        <View style={styles.container}>
          <View style={{ flexDirection: 'column', paddingTop: 92, justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_price.price').toUpperCase(), 1)}</Text>
            <View style={styles.clearLabelSpace} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType={'numeric'}
                returnKeyType="done"
                style={{
                  flex: 1,
                  color: COLORS.BLUE,
                  paddingLeft: 70,
                  height: 45,
                  backgroundColor: COLORS.BLUE_3,
                  fontFamily: FONTS.FONT_BOLD
                }}
                value={this.state.priceValue}
                onChangeText={number => this.setState({ priceValue: number })}
              />
              <View style={styles.unitContainer}>
                <View style={styles.pickerTopBorder} />
                <Picker
                  style={styles.picker}
                  // itemStyle={{ height: 44 }}
                  selectedValue={this.state.unit}
                  // itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                  onValueChange={(itemValue, itemIndex) => this.setState({ unit: itemValue })}
                >
                  <Picker.Item label="pro 100 m" value="pro 100 m" />
                  <Picker.Item label="pro m" value="pro m" />
                  <Picker.Item label="pro m2" value="pro m2" />
                </Picker>
                <View style={styles.pickerBottomBorder} />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', paddingTop: 30, justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_price.length').toUpperCase(), 1)}</Text>
            <View style={styles.clearLabelSpace} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType={'numeric'}
                returnKeyType="done"
                style={{
                  flex: 1,
                  color: COLORS.BLUE,
                  paddingLeft: 70,
                  height: 45,
                  backgroundColor: COLORS.BLUE_3,
                  fontFamily: FONTS.FONT_BOLD
                }}
                value={this.state.lengthValue}
                onChangeText={number => this.setState({ lengthValue: number })}
              />
              <View style={{ width: 130, alignItems: 'center' }}>
                <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, paddingVertical: 15 }}>m</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'column', paddingTop: 25, justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_price.width').toUpperCase(), 1)}</Text>
            <View style={styles.clearLabelSpace} />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType={'numeric'}
                returnKeyType="done"
                style={{
                  flex: 1,
                  color: COLORS.BLUE,
                  paddingLeft: 70,
                  height: 45,
                  backgroundColor: COLORS.BLUE_3,
                  fontFamily: FONTS.FONT_BOLD
                }}
                value={this.state.widthValue}
                onChangeText={number => this.setState({ widthValue: number })}
              />
              <View style={{ width: 130, alignItems: 'center' }}>
                <Text style={{ fontFamily: FONTS.FONT_BOLD, paddingVertical: 20 }}>mm</Text>
              </View>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 5 }}>{applyLetterSpacing(i18n.t('calculation_price.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('280', 1)}</Text>
                <SupText
                  style={styles.unitConverter}
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  text={applyLetterSpacing(i18n.t('calculation_price.price_roll'), 1)}
                />
              </View>
            </View>
          </View>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 52,
    left: 5,
    marginBottom: 20
  },
  pickerTopBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    top: 110,
    left: 15,
    ...Platform.select({
      android: {
        top: 10
      }
    })
  },
  picker: {
    width: 135,
    height: 44,
    top: -90,
    position: 'absolute',
    ...Platform.select({
      android: {
        top: 0
      }
    })
  },
  pickerBottomBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    bottom: 92,
    left: 15,
    ...Platform.select({
      android: {
        bottom: 65
      }
    })
  },
  clearLabelSpace: {
    height: 8
  },
  unitResult: {
    textAlign: 'right',
    flex: 1,
    paddingRight: 20,
    fontSize: 20,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_LIGHT
  },
  unitConverter: {
    width: 130,
    alignItems: 'center'
  },
  unitContainer: {
    width: 100,
    ...Platform.select({
      android: {
        paddingTop: 105
      }
    })
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 32
  },
  result: {
    flex: 1,
    flexDirection: 'column'
  },
  footerMsg: {
    color: COLORS.DARK_GREY,
    fontSize: 11,
    paddingBottom: 5
  },
  msg: {
    color: COLORS.DARK_GREY,
    fontSize: 11,
    paddingBottom: 5
  }
});

export default Details;
