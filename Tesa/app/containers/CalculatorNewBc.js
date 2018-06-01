import React from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  // stateAlwaysVisible
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';

import {BtnOrdinary, BtnDote, BtnClear} from '../components/KeyboardButtons';

export default class CalculatorNew extends React.Component {

  state = {
    text: '0',
    prev: '',
    modalVisible: false
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
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
    return (<ScrollView
      scrollToEnd({animated: true})
      scrollEnabled={true}
      >
      <KeyboardAvoidingView style={styles.wrapper}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content"/>
        <View style={{
            height: 350
          }}></View>
        <TouchableHighlight onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <View style={{
              backgroundColor: '#B0E0E6'
            }}>
            <Text style={styles.textInputResult}>{this.state.text}</Text>
            {/* <Text style={styles.textInput}>{this.state.prev}</Text> */}
          </View>
        </TouchableHighlight>
        <View style={{
            height: 350
          }}></View>

        <Modal style={styles.keyboardLayout} animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <TouchableOpacity style={styles.remainingView} onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}></TouchableOpacity>
          <View style={{
              marginTop: 22,
              position: "absolute",
              bottom: 0
            }}>
            <View>
              <View style={styles.row}>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='1'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='2'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='3'/>
              </View>
              <View style={styles.row}>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='4'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='5'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='6'/>
              </View>
              <View style={styles.row}>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='7'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='8'/>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='9'/>
                <BtnClear prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='C'/>
              </View>
              <View style={styles.row}>
                <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='0'/>
                <BtnDote currentState={this.state.text} click={this.handleClick} value='.'/>
                <BtnOrdinary currentState={this.state.text} click={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }} value='Done'/>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ScrollView>)
  }
}

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const cubeWidth = (width - 40) / 4 - 2;
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  keyboardLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    padding: 5,
    backgroundColor: '#00BFFF',
    width: width,
    height: cubeWidth * 4.2
  },
  remainingView: {
    width: width,
    height: height - cubeWidth * 4.2
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'bottom',
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
