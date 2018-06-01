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
import {GetImageClass} from '../utils/GetImageClass';

// if (value === 'AC')
//     res = require('../images/AC.png')
//   else if (value === '+/-')
//     res = require('../images/plusnegative.png')
//   else if (value === '%')
//     res = require('../images/percent.png')
//   else if (value === '/')
//     res = require('../images/SPLIT.png')
//   else if (value === '*')
//     res = require('../images/x.png')
//   else if (value === '-')
//     res = require('../images/minus.png')
//   else if (value === '+')
//     res = require('../images/plus.png')
//   else if (value === '=')
//     res = require('../images/equal.png')
// }
const imageSrc = (value) => {
  res = ''
  if (value) {
    if (value === 'AC')
      res = require('../images/AC.png')
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
    else if (value === '+/-')
      res = ICONS.C_ICON_3
  }
  return res;
};

const SimpleBtnImage = (props) => {
  return (<TouchableOpacity style={props.buttonContainer} activeOpacity={0.7} onPress={props.pressHandler}>
    <Image source={imageSrc(props.value)} style={styles.imageStyle}/>
  </TouchableOpacity>)
}

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
    return (<SimpleBtnImage buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} value={this.props.value}/>)
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
    return (<SimpleBtnImage buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} value={this.props.value}/>)
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
    return (<SimpleBtnImage buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} value={this.props.value}/>)
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

// export class BtnPercent extends Component {
//   pressHandler = () => {
//     const {currentState, value, click} = this.props;
//     alert("curr state : "+currentState+" value : "+value);
//      let result = + currentState / 100;
//      click(result);
//     var lastChar = currentState.charAt(currentState.length - 1);
//     if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*') {
//       return;
//     }
//     if (currentState.contains('+') || currentState.contains('-') || currentState.contains('/') || currentState.contains('*')) {
//  alert("true");
//       let operations = ['+', '-', '/', '*'];
//       operations.forEach(operation => {
//          if (currentState.contains(operation)) {
//            currentState.split(operation).forEach((elem, index) => {
//              if (index === 1 && elem !== '') {
//                let result = (new Function(`return ${currentState}`))();
//                let result = + result / 100;
//                click(result);
//              }
//            });
//          } else {
//            let result = + currentState / 100;
//            click(result);
//          }
//         currentState.split(operation).forEach((elem, index) => {
//           if (index === 1 && elem !== '') {
//             let result = (new Function(`return ${currentState}`))();
//             result = + result / 100;
//             click(result);
//           }
//         });
//       });
//     } else {
//       let result = + currentState / 100;
//       click(result);
//     }
//   }

export class BtnPercent extends Component {
  pressHandler = () => {
    const {currentState, value, click} = this.props;
    var lastChar = 0;
    if (currentState.length) {
      lastChar = currentState.charAt(currentState.length - 1);
    } else {
      if (currentState === 'Nan')
        return;
      let result = + currentState / 100;
      click(result);
      return;
    }

    if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*' || currentState === 'Nan') {
      return;
    }

    if (currentState.contains('+') || currentState.contains('-') || currentState.contains('/') || currentState.contains('*')) {
      let operations = ['+', '-', '/', '*'];
      operations.forEach(operation => {
        currentState.split(operation).forEach((elem, index) => {
          if (index === 1 && elem !== '') {
            let result = (new Function(`return ${currentState}`))();
            result = + result / 100;
            click(result);
          }
        });
      });
    } else {
      let result = + currentState / 100;
      click(result);
    }
  }

  render() {
    return (<SimpleBtnImage buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} value={this.props.value}/>)
  }
}

export class BtnResult extends Component {
  pressHandler = () => {
    const {currentState, value, click, prev} = this.props;
    console.log('currentState : ' + currentState + 'value : ' + value + 'prev : ' + prev);
    var lastChar = 0;
    if (currentState.length) {
      lastChar = currentState.charAt(currentState.length - 1);
    } else {
      return;
    }
    if (lastChar === '+' || lastChar === '-' || lastChar === '/' || lastChar === '*' || currentState === 'Nan') {
      return;
    }
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
    return (<SimpleBtnImage buttonContainer={styles.buttonContainerOperation} pressHandler={this.pressHandler} value={this.props.value}/>)
  }
}

const {width} = Dimensions.get('window');
const cubeWidth = (width - 40) / 4 - 2;
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    width: cubeWidth,
    height: cubeWidth - 10
  },
  buttonContainerZero: {
    backgroundColor: '#00BFFF',
    margin: 2,
    width: 2 *cubeWidth + 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: cubeWidth - 10
  },
  buttonContainerOperation: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: cubeWidth,
    margin: 2,
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
  },
  imageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    padding: 3,
    width: cubeWidth,
    height: cubeWidth - 10
  }
});
