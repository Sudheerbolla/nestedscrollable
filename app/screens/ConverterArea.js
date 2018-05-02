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
      unit: 'm',
      lengthValue: '10',
      widthValue: '0,653'
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
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.unitFieldContainer}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('converter_area.area').toUpperCase(), 1)}</Text>
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType={'numeric'}
                returnKeyType="done"
                style={styles.unitInput}
                value={this.state.lengthValue}
                onChangeText={number => this.setState({ lengthValue: number })}
              />
            </View>

            <View style={styles.unitContainer}>
              <View style={styles.pickerTopBorder} />
              <Picker
                style={{ paddingTop: 15 }}
                selectedValue={this.state.unit}
                // itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                onValueChange={(itemValue, itemIndex) => this.setState({ unit: itemValue })}
              >
                <Picker.Item label="m2" value="m2" />
                <Picker.Item label="cm2" value="cm2" />
                <Picker.Item label="yard2" value="yard2" />
                <Picker.Item label="feet2" value="feet2" />
                <Picker.Item label="inches2" value="inches2" />
                <Picker.Item label="MSI" value="MSI" />
              </Picker>
              <View style={styles.pickerBottomBorder} />
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('converter_area.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'m'} sup={'2'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'cm'} sup={'2'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'yard'} sup={'2'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'feet'} sup={'2'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'inches'} sup={'2'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} style={styles.unitConverter} text={'MSI'} />
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
        top: 25
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
        bottom: 10
      }
    })
  },
  unitFieldContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  unitInput: {
    padding: 10,
    color: COLORS.BLUE,
    paddingLeft: 70,
    backgroundColor: COLORS.BLUE_3,
    fontFamily: FONTS.FONT_BOLD
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
    width: 100,
    alignItems: 'center'
  },
  unitContainer: {
    width: 100,
    ...Platform.select({
      android: {
        paddingTop: 15
      }
    })
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20
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
