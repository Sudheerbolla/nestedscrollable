import React from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity
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

export default class CalculatorNew extends React.Component {

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

  backClicked() {
    this.props.navigation.goBack()
  }

  render() {
    return (<ScrollView>
      <View style={styles.wrapper}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
        <View style={{
            backgroundColor: '#B0E0E6'
          }}>
          <Text style={styles.textInputResult}>{this.state.text}</Text>
          <Text style={styles.textInput}>{this.state.prev}</Text>
        </View>
        <View style={styles.row}>
          <BtnAC prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='AC'/>
          <BtnPoint currentState={this.state.text} click={this.handleClick} value='+/-'/>
          <BtnPercent currentState={this.state.text} click={this.handleClick} value='%'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='/'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='1'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='2'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='3'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='*'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='4'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='5'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='6'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='-'/>
        </View>
        <View style={styles.row}>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='7'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='8'/>
          <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='9'/>
          <BtnOperation currentState={this.state.text} click={this.handleClick} value='+'/>
        </View>
        <View style={styles.row}>
          <BtnZero currentState={this.state.text} click={this.handleClick} value='0'/>
          <BtnDote currentState={this.state.text} click={this.handleClick} value='.'/>
          <BtnResult prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='='/>
        </View>
      </View>
    </ScrollView>)
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: '#ffffff'
  },
  row: {
    flexDirection: 'row'
  },
  textInput: {
    color: '#000000',
    fontSize: 17,
    alignSelf: 'flex-end',
    padding: 3,
    width: '100%',
    textAlign: 'right'
  },
  textInputResult: {
    color: '#000000',
    fontSize: 38,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    padding: 5,
    width: '100%',
    textAlign: 'right'
  },
  container: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  headingText: {
    color: '#00BFFF',
    fontSize: 28,
    padding: 4
  }
});

{/*
  <BtnOperation currentState={this.state.text} click={this.handleClick} value='x'/>
  <BtnOperation currentState={this.state.text} click={this.handleClick} value='÷'/>
*/
}
