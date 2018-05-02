'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Picker, Dimensions } from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText'
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

class Details extends Component {
  constructor(props){
    super(props)
    this.state = {
      unit: 'mm2'
    }
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

        <View>
          <Text style={styles.footerMsg}>
            {applyLetterSpacing(i18n.t('general.consumption'), 1)} / {applyLetterSpacing('1000 Stanzteile', 1)}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.unitFieldContainer}>
            <Text>{applyLetterSpacing(i18n.t('general.area'), 1)}</Text>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.unitInput}></TextInput>
          </View>

          <View style={styles.unitContainer}>
            <View style={styles.pickerTopBorder}></View>
            <Picker
              style={{paddingTop: 15}}
              selectedValue={this.state.unit}
              // itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
              onValueChange={(itemValue, itemIndex) => this.setState({unit: itemValue})}>
              <Picker.Item label="m2" value="m2" />
              <Picker.Item label="cm2" value="cm2" />
              <Picker.Item label="mm2" value="mm2" />
              <Picker.Item label="yards2" value="yards2" />
              <Picker.Item label="feet2" value="feet2" />
              <Picker.Item label="inches2" value="inches2" />
              <Picker.Item label="MSI" value="msi" />
            </Picker>
            <View style={styles.pickerBottomBorder}></View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.unitFieldContainer}>
            <Text>{applyLetterSpacing(i18n.t('general.area'), 1)}</Text>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)' style={styles.unitInput}></TextInput>
          </View>

          <View style={[styles.unitContainer, { height: 55, justifyContent: 'center', alignItems: 'center' }]}>
            <SupText style={{paddingTop: 15}} text={'m'} />
          </View>
        </View>

        <View style={styles.resultContainer}>
          <View style={{flexDirection: 'column'}}>
            <Text>{applyLetterSpacing(i18n.t('general.area'), 1)}</Text>
          </View>
          <View style={styles.result}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
              <SupText style={styles.unitConverter} text={'m'} sup={'2'} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
              <SupText style={styles.unitConverter} text={'m'} sup={'2'} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
              <SupText style={styles.unitConverter} text={'m'} sup={'2'} />
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.unitResult}>{applyLetterSpacing('10000,00', 1)}</Text>
              <SupText style={styles.unitConverter} text={'m'} sup={'2'} />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.footerMsg}>{applyLetterSpacing(i18n.t('general.without_waste'), 1)}</Text>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  pickerTopBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    top: 110,
    left: 15
  },
  pickerBottomBorder: {
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    position: 'absolute',
    width: 70,
    bottom: 92,
    left: 15,
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
    backgroundColor: COLORS.BLUE_LIGHT
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
    alignItems: 'center',
  },
  unitContainer: {
    width: 100,
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
    paddingBottom: 5,
  },
  msg: {
    color: COLORS.DARK_GREY,
    fontSize: 11,
    paddingBottom: 5,
  }
});

export default Details;
