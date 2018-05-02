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
import {Grid, ImageButton} from '../components';
import NavBar from '../modules/NavBar';
import {COLORS, ICONS, FONTS} from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

class Calculation extends Component {

  state = {
    text: '0',
    prev: ''
  }

  render() {
    const {params} = this.props.navigation.state;
    return (<Grid>
      <NavBar onBack={() => {
          this.props.navigation.goBack();
        }} titleStyle={{
          fontSize: 25
        }} title={params.title}/>
      <ScrollView scrollEnabled={Platform.select({ios: false, android: true})}>
        <ImageBackground source={ICONS.LAYER_FILLIN} style={styles.resultCont}>
          <Text style={styles.textInputResult}>{applyLetterSpacing(this.state.text, Platform.select({ios: 5, android: 2}))}</Text>
          <Text style={styles.textInput}>{applyLetterSpacing(this.state.prev, Platform.select({ios: 5, android: 2}))}</Text>
        </ImageBackground>

        <View style={styles.row}>
          <BtnAC prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='AC'/>
          <BtnPoint currentState={this.state.text} click={this.handleClick} value='+/-'/>
          <BtnPercent currentState={this.state.text} click={this.handleClick} value='%'/>
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


        <View style={styles.row}>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_0} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_3} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_1} style={styles.image}/>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_9} style={styles.image}/>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_6} style={styles.image}/>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_5} style={styles.image}/>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_2} style={styles.image}/>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[
              styles.rowItem,
              styles.numberColumn, {
                width: (width - 40) / 2
              }
            ]}>
            <Text style={[styles.text, styles.number]}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.numberColumn]}>
            <Text style={[styles.text, styles.number]}>,</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.rowItem, styles.operatorColumn]}>
            <ImageBackground source={ICONS.C_ICON_4} style={styles.image}/>
          </TouchableOpacity>
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
    alignSelf: 'center',
    top: -3
  },
  overlayImage: {
    position: 'absolute',
    top: 0
  },
  cubeImage: {
    width: width - 30,
    resizeMode: 'contain'
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 82
  },
  resultText: {
    width: width - 30,
    textAlign: 'center',
    paddingTop: 10,
    fontSize: 50,
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY
  },
  row: {
    flexDirection: 'row',
    marginTop: 5
  },
  rowItem: {
    width: cubeWidth,
    height: cubeWidth - 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
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
    color: COLORS.BLUE
  },
  number: {
    color: 'white'
  },
  textInput: {
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY,
    fontSize: 17,
    alignSelf: 'flex-end',
    padding: 3,
    width: '100%',
    textAlign: 'right'
  },
  textInputResult: {
    width: width - 30,
    textAlign: 'center',
    paddingTop: 5,
    fontSize: 50,
    fontFamily: FONTS.FONT_BOLD,
    color: COLORS.DARK_GREY
  },
  resultCont: {
    width: width - 30
  }
});

export default Calculation;

{/* <View style={styles.resultContainer}>
  <Text style={styles.resultText}>{applyLetterSpacing('0.000,00', Platform.select({ios: 5, android: 2}))}</Text>
</View> */
}
