'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView
} from 'react-native';

import {
  BtnOrdinary,
  BtnZero,
  BtnAC,
  BtnOperation,
  BtnPoint,
  BtnDote,
  BtnPercent,
  BtnResult
} from '../components/Buttons';

import {Grid, ImageButton} from '../components';
import NavBar from '../modules/NavBar';
import {COLORS, ICONS, FONTS} from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

export default class Calculation extends Component {

  state = {
    text: '0',
    prev: ''
  }

  handleClick = (value, prev) => {
    console.log('value : ' + value);
    console.log('prev : ' + prev);
    this.setState({
      text: value,
      prev: prev || this.state.prev
    });
  }

  handleClickPercent = (value, prev, isPercent) => {
    let operations = ['+', '-', '/', '*'];
    if (isPercent && new RegExp(/[+-/*]+/).test(prev)) {
      // if (res.toString().includes('+') || res.toString().includes('-') || res.toString().includes('/') || res.toString().includes('*')) {
      var lastItem = prev.split(/[+-/*]+/)[prev.split(/[+-/*]+/).length - 1];
      var res = prev.substring(0, prev.lastIndexOf(lastItem));
      var lastChar = res[res.length - 1];
      res = res.slice(0, -1);
      if (prev.split(/[+-/*]+/).length > 2) {
        operations.forEach(operation => {
          res.split(operation).forEach((elem, index) => {
            if (index === 1 && elem !== '') {
              let result = (new Function(`return ${res}`))();
              result = + result;
              if (lastChar === "+") {
                result = result + (result * lastItem / 100);
              } else if (lastChar === "-") {
                result = result - (result * lastItem / 100);
              } else if (lastChar === "/") {
                result = result / (result * lastItem / 100);
              } else if (lastChar === "*") {
                result = result * (result * lastItem / 100);
              }

              this.setState({
                text: result,
                prev: prev || this.state.prev
              });
            }
          });
        });
      } else {
        if (lastChar === "+") {
          res = parseInt(res, 10) + (res * lastItem / 100);
        } else if (lastChar === "-") {
          res = parseInt(res, 10) - (res * lastItem / 100);
        } else if (lastChar === "/") {
          res = parseInt(res, 10) / (res * lastItem / 100);
        } else if (lastChar === "*") {
          res = parseInt(res, 10) * (res * lastItem / 100);
        }

        this.setState({
          text: res,
          prev: prev || this.state.prev
        });
      }
    }
  }

  // operation => {
  // for (var i = 0; i < operations.length; i++) {
  // var operation=  operations[i]
  //
  // }
  // res.split(operation).forEach((elem, index) => {
  //   if (index === 1 && elem !== '') {
  //     let result = (new Function(`return ${res}`))();
  //     result = + result;
  //      result=parseInt(res, 10) + (res * lastItem / 100);
  //     this.setState({
  //       text: result,
  //       prev: prev || this.state.prev
  //     });
  //   }

  round(number, precision) {
    var shift = function(number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return + (numArray[0] + "e" + (
        numArray[1]
        ? (+ numArray[1] + precision)
        : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  render() {
    const {params} = this.props.navigation.state;
    return (<Grid>
      <NavBar onBack={() => {
          this.props.navigation.goBack();
        }} titleStyle={{
          fontSize: 25
        }} title={params.title}/>
      <ScrollView>
        <View style={{
            backgroundColor: '#B0E0E6',
            padding: 3
          }}>
          {/* <Text style={styles.textInputResult}>{this.round(this.state.text, 4).toString()}</Text> */}
          <Text style={styles.textInputResult}>{this.state.text}</Text>
          <Text style={styles.textInput}>{this.state.prev}</Text>
        </View>
        <View style={[
            styles.row, {
              marginTop: 10
            }
          ]}>
          <BtnAC prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='AC'/>
          <BtnPoint currentState={this.state.text} click={this.handleClick} value='+/-'/>
          <BtnPercent currentState={this.state.text} click={this.handleClickPercent} value='%'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='/'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='7'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='8'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='9'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='*'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='4'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='5'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='6'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='-'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='1'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='2'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='3'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='+'/>
        </View>
        <View style={styles.row}>
          <BtnZero currentState={this.state.text} click={this.handleClick} value='0'/>
          <BtnDote currentState={this.state.text} click={this.handleClick} value='.'/>
          <BtnResult prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='='/>
        </View>

        {
          Platform.OS === 'android' && <View style={{
                height: 35
              }}/>
        }
      </ScrollView>
    </Grid>);
  }

}

const {width} = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const cubeWidth = (width - 40) / 4 - 2;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  rowItem: {
    width: cubeWidth,
    height: cubeWidth - 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 20
  },
  textInput: {
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY,
    fontSize: 16,
    alignSelf: 'flex-end',
    padding: 3,
    width: '100%',
    textAlign: 'right'
  },
  textInputResult: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 38,
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY
  }
});
