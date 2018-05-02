'use strict';

import React, { Component } from 'react';
import {
  Linking,
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import call from 'react-native-phone-call';
import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';
import { COLORS, ICONS, FONTS } from '../constants';
import Layout from './Layout';
import NavBar from '../modules/NavBar';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';
const deviceCountry = DeviceInfo.getDeviceCountry();

const { width } = Dimensions.get('window');

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      firm: '',
      message: '',
      limitMsg: 0,
      callTo: deviceCountry === 'US' ? '494050691464' : '494053257770',
      mailTo: i18n.t('general.mailto')
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const textLength = this.state.message.length;
    const textLimit = 1000000000 - textLength;
    const callTo = {
      number: this.state.callTo,
      prompt: false
    };

    return (
      <Layout>
        <NavBar
          onBack={() => {
            this.props.navigation.goBack();
          }}
          title={params.title}
        />
        <View style={{ flex: 1 }}>
          <View style={styles.form}>
            <View style={styles.field}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={COLORS.DARK_GREY}
                placeholder={applyLetterSpacing(
                  i18n.t('contact.name').toUpperCase(),
                  1
                )}
                style={styles.input}
                value={this.state.name}
                onChangeText={text => this.setState({ name: text })}
              />
            </View>

            <View style={styles.field}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={COLORS.DARK_GREY}
                placeholder={applyLetterSpacing(
                  i18n.t('contact.firw').toUpperCase(),
                  1
                )}
                style={styles.input}
                value={this.state.firm}
                onChangeText={text => this.setState({ firm: text })}
              />
            </View>

            <View style={styles.field}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={COLORS.DARK_GREY}
                placeholder={applyLetterSpacing(
                  i18n.t('contact.email').toUpperCase(),
                  1
                )}
                style={styles.input}
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </View>

            <View style={styles.fieldDescription}>
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholderTextColor={COLORS.DARK_GREY}
                placeholder={applyLetterSpacing(
                  i18n.t('contact.message').toUpperCase(),
                  1
                )}
                multiline={true}
                style={styles.inputDescription}
                value={this.state.message}
                onChangeText={text => this.setState({ message: text })}
              />
            </View>
            <Text style={styles.footerDescription}>
              {applyLetterSpacing(`${textLimit} Zeichem`, 1)}
            </Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => Communications.phonecall(this.state.callTo, true)}
            >
              <View style={styles.rowItem}>
                <Image source={ICONS.PHONE} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('contact.call').toUpperCase(), 1)}
                </Text>
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(
                    (deviceCountry === 'US'
                      ? '+49 40 506 914 64'
                      : '+49 40 532 577 70'
                    ).toUpperCase(),
                    1
                  )}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Communications.email(
                  this.state.mailTo,
                  null,
                  null,
                  'Feedback',
                  this.state.message
                );
              }}
            >
              <View style={[styles.rowItem, styles.mailButton]}>
                <Image source={ICONS.MAIL} style={styles.rowIcon} />
                <Text style={styles.rowLabel}>
                  {applyLetterSpacing(i18n.t('contact.send'), 1)}
                </Text>
                <Text style={styles.rowLabel} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {applyLetterSpacing('IMPRESSUM', 1)}
            </Text>
            <Text style={styles.footerText}> | </Text>
            <Text style={styles.footerText}>
              {applyLetterSpacing('DATENSCHUTZ', 1)}
            </Text>
            <Text style={styles.footerText}> | </Text>
            <Text style={styles.footerText}>
              {applyLetterSpacing('NUTZUNGSBEDINGUNGEN', 1)}
            </Text>
          </View>
        </View>
      </Layout>
    );
  }
}

const cubeWidth = (width - 30) / 2;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10
  },
  field: {
    borderWidth: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.LIGHT_GREY,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    width: 50,
    textAlign: 'left',
    paddingLeft: 10,
    backgroundColor: 'transparent',
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD
  },
  input: {
    flex: 1,
    height: 40,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    marginLeft: 15
  },
  fieldDescription: {
    flexDirection: 'column',
    backgroundColor: COLORS.BLUE_LIGHT
  },
  labelDescription: {
    textAlign: 'left',
    paddingLeft: 10,

    backgroundColor: 'transparent',
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD
  },
  inputDescription: {
    height: 120,
    paddingTop: 10,
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD,
    marginLeft: 15
  },
  footerDescription: {
    color: COLORS.BLUE,
    fontFamily: FONTS.FONT_BOLD,
    fontSize: 10,
    textAlign: 'right',
    paddingTop: 2,
    paddingBottom: 3
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 0,
    borderTopWidth: 2,
    borderTopColor: COLORS.DARK_GREY
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
    fontSize: 18
  },
  rowIcon: {
    resizeMode: 'contain',
    width: cubeWidth / 2.5,
    height: cubeWidth / 2.5
  },
  mailButton: {
    borderWidth: 0,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.DARK_GREY
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  footerText: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD
  }
});

export default Contact;
