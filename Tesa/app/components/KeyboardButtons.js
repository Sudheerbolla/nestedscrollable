import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform
} from 'react-native'
import {COLORS, ICONS, FONTS} from '../constants';

const SimpleBtn = (props) => {
  return (<TouchableOpacity style={props.buttonContainer} activeOpacity={0.7} onPress={props.pressHandler}>
    <Text style={props.buttonText}>
      {props.value}
    </Text>
  </TouchableOpacity>)
}

export class BtnOrdinary extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    if (currentState !== '0') {
      click(currentState + value);
    } else {
      click(value);
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainer} pressHandler={this.pressHandler} buttonText={styles.buttonTextWhite} value={this.props.value}/>)
  }
}

export class BtnClear extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    if (value === 'C') {
      if(currentState.toString().length>1) {
          var exceptLast = currentState.toString();
          exceptLast = exceptLast.slice(0, -1);
          click(exceptLast);
      } else {
        click('0');
      }
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainer} pressHandler={this.pressHandler} value={this.props.value}/>)
  }
}

export class BtnDote extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    console.log('currentState : ' + currentState + 'value : ' + value);
    if (currentState.toString().includes('.')) {
      let operations = ['+', '-', '/', '*'];
      operations.forEach(operation => {
        currentState.split(operation).forEach((elem, index) => {
          if (index === 1 && elem !== '') {
            click(
              elem.toString().includes('.')
              ? currentState
              : currentState + '.');
          }
        });
      });
    } else {
      click(currentState + '.');
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainer} pressHandler={this.pressHandler} buttonText={styles.buttonTextWhite} value={this.props.value}/>)
  }
}

const {width} = Dimensions.get('window');
const cubeWidth = (width - 40) / 4 - 2;
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#800080',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: cubeWidth,
    height: cubeWidth - 10
  },
  buttonText: {
    color: '#808080',
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 30
  },
  buttonTextWhite: {
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 26,
    fontWeight: '200'
  }
});
