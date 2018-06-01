import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../constants';

export default class SupText extends Component {
  static defaultProps = {
    text: null,
    sup: null,
    textStyle: {
      color: COLORS.DARK_GREY
    },
    supStyle: {
      color: COLORS.DARK_GREY
    },
    style: {}
  };

  render() {
    const { text, sup, textStyle, supStyle, style } = this.props;
    return (
      <View style={[{flexDirection: 'row'}, style]}>
        <Text style={[{color: COLORS.DARK_GREY},textStyle]}>{text}</Text>
        <Text style={[{bottom: 3, fontSize: 9, color: COLORS.DARK_GREY}, supStyle]}>{sup}</Text>
      </View>
    );
  }
}
