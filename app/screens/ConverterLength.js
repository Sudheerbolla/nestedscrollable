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
      unit: 'mm',
      lengthValue: '10'
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
              <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('converter_length.length').toUpperCase(), 1)}</Text>
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
                <Picker.Item label="m" value="m" />
                <Picker.Item label="cm" value="cm" />
                <Picker.Item label="mm" value="mm" />
                <Picker.Item label="yards" value="yards" />
                <Picker.Item label="feet" value="feet" />
                <Picker.Item label="inches" value="inches" />
                <Picker.Item label="MSI" value="MSI" />
              </Picker>
              <View style={styles.pickerBottomBorder} />
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('converter_length.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'m'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('1000,00', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'cm'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('100,00', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'yard'} />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('107,64', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'feets'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('15500,00', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'inches'} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('15500,00', 1)}</Text>
                <SupText style={styles.unitConverter} textStyle={{ fontFamily: FONTS.FONT_BOLD }} supStyle={{ fontFamily: FONTS.FONT_BOLD }} text={'MSI'} />
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
        top: 30
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
    marginTop: 5,
    paddingVertical: 15,
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
        paddingTop: 25
      }
    })
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60
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
