import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';

import {BtnOrdinary, BtnDote, BtnClear} from './KeyboardButtons';

export default class KeyboardModalView extends React.Component {

  state = {
    text: '0',
    prev: '',
    modalVisible: true
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

  render() {
    return (<View>
      <Modal style={itemViewStyles.keyboardLayout} animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {
          this.setModalVisible(!this.state.modalVisible);
        }}>
        <TouchableOpacity style={itemViewStyles.remainingView} onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}></TouchableOpacity>
        <View style={{
            marginTop: 22,
            position: "absolute",
            bottom: 0
          }}>
          <View>
            <View style={itemViewStyles.row}>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='1'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='2'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='3'/>
            </View>
            <View style={itemViewStyles.row}>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='4'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='5'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='6'/>
            </View>
            <View style={itemViewStyles.row}>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='7'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='8'/>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='9'/>
              <BtnClear prev={this.state.prev} currentState={this.state.text} click={this.handleClick} value='C'/>
            </View>
            <View style={itemViewStyles.row}>
              <BtnOrdinary currentState={this.state.text} click={this.handleClick} value='0'/>
              <BtnDote currentState={this.state.text} click={this.handleClick} value='.'/>
              <BtnOrdinary currentState={this.state.text} click={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }} value='Done'/>
            </View>
          </View>
        </View>
      </Modal>
    </View>)
  }
}
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const cubeWidth = (width - 40) / 4 - 2;
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const itemViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 150,
    padding: 10
  },
  profileImage: {
    width: 80,
    height: 80,
    padding: 5,
    borderRadius: 10
  },
  loginText: {
    color: "#000000",
    fontSize: 16,
    padding: 2,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row'
  },
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
  }
});
