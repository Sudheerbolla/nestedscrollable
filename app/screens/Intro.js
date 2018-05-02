'use strict';

import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {COLORS, ICONS, FONTS} from '../constants';
import Layout from './Layout';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import LaunchScreen from './LaunchScreen';

const {width} = Dimensions.get('window');

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const self = this;
    setTimeout(function() {
      self.setState({loading: false});
    }, 2000);
  }

  render() {
    return (<View style={{
        flex: 1
      }}>
      {
        this.state.loading
          ? (<LaunchScreen/>)
          : (<Layout>
            <View>
              <Image source={ICONS.TAPE_CALCULATOR} style={styles.imageStyles}/>

              <View style={styles.row}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Calculation', {
                      title: applyLetterSpacing(i18n.t('general.calculation').toUpperCase())
                    });
                  }}>
                  <View style={styles.rowItem}>
                    <Text style={styles.rowLabel}>
                      {applyLetterSpacing(i18n.t('general.calculation').toUpperCase(), 1)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>

                <View style={{
                    width: 1,
                    backgroundColor: '#000000'
                  }}/>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Converter', {
                      title: applyLetterSpacing(i18n.t('general.converter').toUpperCase())
                    });
                  }}>
                  <View style={styles.rowItem}>
                    <View style={styles.rowIcon}>
                      <Image source={ICONS.START_ICON_2} style={styles.converterIcon}/>
                    </View>
                    <Text style={styles.rowLabel}>
                      {applyLetterSpacing(i18n.t('general.converter').toUpperCase(), 1)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

              <View style={{
                  height: 1,
                  marginLeft: 10,
                  marginRight: 10,
                  backgroundColor: '#000000'
                }}/>

              <View style={styles.row}>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('CalculatorNew', {
                      title: applyLetterSpacing(i18n.t('general.calculator').toUpperCase())
                    });
                  }}>
                  <View style={styles.rowItem}>
                    <View style={styles.rowIcon}>
                      <Image source={ICONS.START_ICON_4} style={styles.calculatorIcon}/>
                    </View>
                    <Text style={styles.rowLabel}>
                      {applyLetterSpacing(i18n.t('general.calculator').toUpperCase(), 1)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: 1,
                    backgroundColor: '#000000'
                  }}/>
                <TouchableWithoutFeedback onPress={() => {
                    this.props.navigation.navigate('Contact', {
                      title: applyLetterSpacing(i18n.t('general.contact').toUpperCase())
                    });
                  }}>
                  <View style={styles.rowItem}>
                    <View style={styles.rowIcon}>
                      <Image source={ICONS.START_ICON_3} style={styles.contactIcon}/>
                    </View>
                    <Text style={styles.rowLabel}>
                      {applyLetterSpacing(i18n.t('general.contact').toUpperCase(), 1)}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>

            </View>
          </Layout>)
      }
    </View>);
  }
}

const cubeWidth = (width - 40) / 2;

const styles = StyleSheet.create({
  clearNavbar: {
    height: 54
  },
  imageStyles: {
    resizeMode: 'contain',
    width: width - 31,
    top: 11,
    left: -6
  },
  overlayImage: {
    position: 'absolute',
    top: width / 2 + 3
  },
  cubeImage: {
    width: width - 45,
    height: width - 30,
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    top: -20
  },
  rowItem: {
    width: cubeWidth,
    height: cubeWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowLabel: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 18,
    flex: 1
  },
  rowIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 55
  },
  calculationIcon: {
    resizeMode: 'contain',
    width: cubeWidth / 7,
    height: cubeWidth / 7
  },
  converterIcon: {
    resizeMode: 'contain',
    width: cubeWidth / 3.7,
    height: cubeWidth / 3.7
  },
  calculatorIcon: {
    resizeMode: 'contain',
    width: cubeWidth / 3.7,
    height: cubeWidth / 3.7
  },
  contactIcon: {
    resizeMode: 'contain',
    width: cubeWidth / 3.7,
    height: cubeWidth / 3.7
  }
});

export default Intro;
