'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Picker, Dimensions } from 'react-native';
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
          onRight={() => {
            alert('on Shared');
          }}
        />
        <View style={styles.container}>
          <View style={{ justifyContent: 'center', marginVertical: 33 }}>
            <Text style={styles.footerMsg}>{applyLetterSpacing(i18n.t('calculation_consumptation.punch_line'), 1)}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('calculation_consumptation.length_x').toUpperCase(), 1)}</Text>
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
                <Text style={{ fontFamily: FONTS.FONT_BOLD, paddingVertical: 15 }}>mm</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: 'column', paddingTop: 10, justifyContent: 'center' }}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD }}>{applyLetterSpacing(i18n.t('calculation_consumptation.width_y').toUpperCase(), 1)}</Text>
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
                <Text style={{ fontFamily: FONTS.FONT_BOLD, paddingVertical: 15 }}>μm</Text>
              </View>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontFamily: FONTS.FONT_BOLD, top: 5 }}>{applyLetterSpacing(i18n.t('calculation_consumptation.result').toUpperCase(), 1)}</Text>
            </View>
            <View style={styles.result}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.unitResult}>{applyLetterSpacing('280', 1)}</Text>
                <SupText
                  style={styles.unitConverter}
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 19 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 12 }}
                  text={'m'}
                  sup={'2'}
                />
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{}}>{applyLetterSpacing(i18n.t('calculation_consumptation.without_waste'), 1)}</Text>
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
    width: 100
  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30
  },
  result: {
    flex: 1,
    flexDirection: 'column'
  },
  footerMsg: {
    color: COLORS.DARK_GREY,
    fontSize: 15,
    paddingBottom: 5
  },
  msg: {
    color: COLORS.DARK_GREY,
    fontSize: 11,
    paddingBottom: 5
  }
});

export default Details;
