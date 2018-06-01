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
      unit: '3-Zoll-Kern',
      lengthValue: '66',
      widthValue: '205'
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
          titleStyle={{ fontSize: 20, textAlign: 'center' }}
          onRight={() => {
            alert('on Shared');
          }}
        />
        <View style={styles.container}>
          <View style={{ height: 70, flexDirection: 'row', paddingTop: 40 }}>
            <Text style={{ flex: 1, fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_diameter.core').toUpperCase(), 1)}</Text>
            <View style={{ width: 130, position: 'relative' }}>
              <View style={styles.pickerTopBorder} />
              <Picker
                style={styles.picker}
                // itemStyle={{ height: 44 }}
                selectedValue={this.state.unit}
                // itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                onValueChange={(itemValue, itemIndex) => this.setState({ unit: itemValue })}
              >
                <Picker.Item label="3-Zoll-Kern" value="3-Zoll-Kern" />
                <Picker.Item label="6-Zoll-Kern" value="6-Zoll-Kern" />
              </Picker>
              <View style={styles.pickerBottomBorder} />
            </View>
          </View>

          <View style={{ height: 110, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_diameter.length').toUpperCase(), 1)}</Text>
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
              <View style={{ width: 130, alignItems: 'center', height: 45 }}>
                <Text style={{ fontFamily: FONTS.FONT_BOLD, paddingTop: 15 }}>m</Text>
              </View>
            </View>
          </View>

          <View style={{ height: 110, flexDirection: 'column', paddingTop: 10 }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>{applyLetterSpacing(i18n.t('calculation_diameter.thickness').toUpperCase(), 1)}</Text>
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
              <View style={{ width: 130, alignItems: 'center', height: 45 }}>
                <Text style={{ fontFamily: FONTS.FONT_BOLD, paddingTop: 15 }}>μm</Text>
              </View>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, top: 5 }}>{applyLetterSpacing(i18n.t('calculation_diameter.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('280', 1)}</Text>
                <SupText
                  style={styles.unitConverter}
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  text={'mm'}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('3444', 1)}</Text>
                <SupText
                  style={styles.unitConverter}
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  text={'inches'}
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
  clearLabelSpace: {
    height: 8
  },
  picker: {
    width: 135,
    height: 44,
    top: -100,
    position: 'absolute',
    ...Platform.select({
      android: {
        top: -15
      }
    })
  },
  pickerTopBorder: {
    borderWidth: 1,
    borderColor: COLORS.GREY,
    position: 'absolute',
    width: 100,
    top: -10,
    left: 15,
    ...Platform.select({
      android: {
        top: -10
      }
    })
  },
  pickerBottomBorder: {
    borderWidth: 1,
    borderColor: COLORS.GREY,
    position: 'absolute',
    width: 100,
    bottom: 5,
    left: 15,
    ...Platform.select({
      android: {
        bottom: 0
      }
    })
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
    marginTop: 36
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
