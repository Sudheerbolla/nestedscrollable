import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

const getIcon(value) {
  res = ''
  if (value) {
    if (value === 'AC')
      res = ICONS.C_ICON_0
    else if (value === '+/-')
      res = ICONS.C_ICON_3
    else if (value === '%')
      res = ICONS.C_ICON_1
    else if (value === '/')
      res = ICONS.C_ICON_9
    else if (value === '*')
      res = ICONS.C_ICON_6
    else if (value === '-')
      res = ICONS.C_ICON_5
    else if (value === '+')
      res = ICONS.C_ICON_2
    else if (value === '=')
      res = ICONS.C_ICON_4
      // else if (value === '+/-')
    //   res = ICONS.C_ICON_3
  }
  return res;
}

const SimpleBtnImage = (props) => {
  return (<TouchableOpacity style={props.buttonContainer} activeOpacity={0.5} onPress={props.pressHandler}>
    <ImageBackground source={this.getIcon(props.value)} style={styles.image}/>
  </TouchableOpacity>)
}

const SimpleBtn = (props) => {
  return (<TouchableOpacity style={props.buttonContainer} activeOpacity={0.5} onPress={props.pressHandler}>
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

export class BtnZero extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    if (currentState === '0') {
      click('0');
    } else {
      click(currentState + '0');
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerZero} pressHandler={this.pressHandler} buttonText={styles.buttonTextWhite} value={this.props.value}/>)
  }
}

export class BtnAC extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    if (value === 'AC') {
      click('0', ' ');
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} buttonText={styles.buttonTextBlue} value={this.props.value}/>)
  }
}

export class BtnOperation extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    let last = currentState.toString().charAt(currentState.length - 1);
    if ('+-*/'.includes(last)) {
      click(currentState);
    } else {
      click(currentState + value);
    }
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} buttonText={styles.buttonText} value={this.props.value}/>)
  }
}

export class BtnPoint extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    if (currentState === '0') {
      click(currentState);
    } else {
      let symbol = currentState.toString().charAt(0);
      let result = '';
      if (symbol === '-') {
        result = currentState.slice(1);
      } else {
        result = `-${currentState}`;
      }

      click(result);
    }

  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} buttonText={styles.buttonTextBlue} value={this.props.value}/>)
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

export class BtnPercent extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    let result = + currentState / 100;
    click(result);
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} buttonText={styles.buttonTextBlue} value={this.props.value}/>)
  }
}

export class BtnResult extends Component {
  pressHandler = () => {
    const {currentState, value, click, prev} = this.props;
    console.log('currentState : ' + currentState + 'value : ' + value + 'prev : ' + prev);
    let operations = ['+', '-', '/', '*'];
    operations.forEach(operation => {
      currentState.split(operation).forEach((elem, index) => {
        if (index === 1 && elem !== '') {
          let result = (new Function(`return ${currentState}`))();
          console.log('result : ' + result);
          click(result.toString().slice(0, 15), `${currentState}`);
          // console.log('result slice(0, 15) with currentState : ' + result.toString().slice(0, 15), `${currentState}`);
        }
      });
    });
  }

  render() {
    return (<SimpleBtn buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} buttonText={styles.buttonText} value={this.props.value}/>)
  }
}

const cubeWidth = (width - 40) / 4 - 2;
const {width} = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;
const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#00BFFF',
    width: 83,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2
  },
  buttonContainerZero: {
    backgroundColor: '#00BFFF',
    margin: 2,
    width: 170,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  buttonContainerOperation: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 83,
    height: 80
  },
  buttonContainerGrey: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 83,
    height: 80
  },
  // 696969
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
  },
  buttonTextBlue: {
    color: '#00BFFF',
    textAlign: 'center',
    fontSize: 26,
    fontFamily: FONTS.FONT_BOLD,
    fontWeight: '200'
  }
});
