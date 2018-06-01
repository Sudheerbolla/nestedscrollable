import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class CalculatorButton extends React.Component {

  getImageSource(isFrom) {
    src = ''
    if (isFrom === 'calculation') {
      src = require('../resources/calculation.png')
    } else if (isFrom === 'conversion') {
      src = require('../resources/converter.png')
    } else if (isFrom === 'calculator') {
      src = require('../resources/calculator.png')
    } else if (isFrom === 'contact') {
      src = require('../resources/contact.png')
    }
    return src
  }

  render() {
    return ((<TouchableOpacity style={props.buttonContainer} activeOpacity={0.5} onPress={props.pressHandler}>
      <ImageBackground source={this.getIcon(props.value)} style={styles.image}/>
    </TouchableOpacity>))
  }
}

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
  buttonContainer: {
    backgroundColor: '#00BFFF',
    width: 83,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2
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
  }
});

{/* <View style={itemViewStyles.loginTextCont}>
<Image style={itemViewStyles.profileImage} source={{
    uri: this.props.dataFromParent.picture.thumbnail
  }}/>
<View style={itemViewStyles.texContainer}>
  <Text style={itemViewStyles.loginText}>
    {this.props.dataFromParent.name.first}
  </Text>
  <Text style={itemViewStyles.loginText}>
    {this.props.dataFromParent.email}</Text>
</View>
</View> */
}
