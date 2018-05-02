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
      lengthValue: '66,00',
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
          <View style={styles.clearNav} />
          <View style={[styles.row, { height: 170 }]}>
            <View style={[styles.unitFieldContainer, { marginTop: 75 }]}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_area.length').toUpperCase(), 1)}</Text>
              <View style={styles.clearLabelSpace} />
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
                <Picker.Item label="yards" value="yards" />
                <Picker.Item label="m" value="m" />
                <Picker.Item label="feet" value="feet" />
                <Picker.Item label="inches" value="inches" />
              </Picker>
              <View style={styles.pickerBottomBorder} />
            </View>
          </View>

          <View style={[styles.row, { height: 125, marginTop: 7 }]}>
            <View style={styles.unitFieldContainer}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_area.width').toUpperCase(), 1)}</Text>
              <View style={styles.clearLabelSpace} />
              <TextInput
                underlineColorAndroid="rgba(0,0,0,0)"
                keyboardType={'numeric'}
                returnKeyType="done"
                style={styles.unitInput}
                value={this.state.widthValue}
                onChangeText={number => this.setState({ widthValue: number })}
              />
            </View>

            <View style={[styles.unitContainer, { height: 125, paddingTop: 25, alignItems: 'center' }]}>
              <SupText style={{ paddingTop: 15 }} text={this.state.unit} />
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_area.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('4,80', 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  style={styles.unitConverter}
                  text={'m'}
                  sup={'2'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('5,25', 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  style={styles.unitConverter}
                  text={'yards'}
                  sup={'2'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('15,75', 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  style={styles.unitConverter}
                  text={'feet'}
                  sup={'2'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('189,98', 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  style={styles.unitConverter}
                  text={'inches'}
                  sup={'2'}
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
  clearNav: {
    marginBottom: 18
  },
  clearLabelSpace: {
    height: 8
  },
  row: {
    flexDirection: 'row'
  },
  pickerTopBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    top: 107,
    left: 15,
    ...Platform.select({
      android: {
        top: 110
      }
    })
  },
  pickerBottomBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    bottom: 33,
    left: 15,
    ...Platform.select({
      android: {
        bottom: 20
      }
    })
  },
  unitFieldContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  unitInput: {
    paddingVertical: 16,
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
    fontFamily: FONTS.FONT_LIGHT,
    top: -6,
    paddingBottom: 8
  },
  unitConverter: {
    width: 100,
    top: -9,
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
    marginTop: 13
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
