'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

export default class Calculator extends Component {
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
        <View>
          <View style={styles.overlayImage}>
            <Image source={ICONS.LAYER_FILLIN} style={styles.cubeImage} />
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>0.000,00</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.blueTextOperator]}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.blueTextOperator]}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.blueTextOperator]}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.operator]}>÷</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.operator]}>x</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.operator]}>-</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.operator]}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn, { width: (width - 40) / 2 }]}>
              <Text style={[styles.text,styles.number]}>=</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
              <Text style={[styles.text,styles.number]}>,</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
              <Text style={[styles.text,styles.operator]}>=</Text>
            </TouchableOpacity>
          </View>

        </View>
      </Layout>
    );
  }
}

const cubeWidth = ((width - 40) / 4) - 2;

const styles = StyleSheet.create({
  overlayImage: {
    position: 'absolute',
    top: 0,
  },
  cubeImage: {
    width: width - 30,
    resizeMode: 'contain'
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 82,
  },
  resultText: {
    width: width - 30,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 50,
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY,
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,
  },
  rowItem: {
    width: cubeWidth,
    height: cubeWidth - 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  text: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 20
  },
  operatorColumn: {
    backgroundColor: 'white'
  },
  numberColumn: {
    backgroundColor: COLORS.BLUE
  },
  operator: {
    color: COLORS.DARK_GREY,
    fontSize: 25
  },
  blueTextOperator: {
    color: COLORS.BLUE,
  },
  number: {
    color: 'white'
  }
});
