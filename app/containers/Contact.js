'use strict';

import React, { Component } from 'react';

import { Linking, StyleSheet, View, Text, TextInput, Dimensions, Image, ImageBackground, TouchableOpacity, ScrollView, Platform } from 'react-native';
import call from 'react-native-phone-call';
import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';

import { Grid, ImageButton } from '../components';
import NavBar from '../modules/NavBar';
import { COLORS, ICONS, FONTS } from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const deviceCountry = DeviceInfo.getDeviceCountry();

// var express = require('express'),
//     path = require('path'),
//     nodeMailer = require('nodemailer');
//
//     var app = express();
//     var port = 3000;

    // app.listen(port, function(req, res){
    //   console.log('Server is running at port: ',port);
    // });

class Calculation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      firm: '',
      message: '',
      limitMsg: 0,
      callTo: '',
      mailTo: '',
      displayPhone: ''
    };
  }

  componentDidMount() {
    let mailTo = '';
    let displayPhone = '';
    let callTo = 1234567890;
    switch (deviceCountry) {
      case 'DE':
        mailTo = 'malte.spaniol@itpe-germany.de';
        // mailTo = 'tesa.industrieinternetanfragen@tesa.com';
        // displayPhone = '+49 40 888 99 0';
        displayPhone = '+49 40 53257770';
        callTo = '494053257770';
        // callTo = 4940888990;
        break;
      case 'FR':
        mailTo = 'contact.france@tesa.com';
        displayPhone = '+33 1 78 48 20 00';
        callTo = 33178482000;
        break;
      case 'DK':
        mailTo = 'customerservice.dk@tesa.com';
        displayPhone = '+45 45 998 200';
        callTo = 4545998200;
        break;
      case 'EE':
        mailTo = 'estonia@tesa.com';
        displayPhone = '+372 640 1366';
        callTo = 3726401366;
        break;
      case 'FI':
        mailTo = 'finland@tesa.com';
        displayPhone = '+358 2 2103 400';
        callTo = 35822103400;
        break;
      default:
        mailTo = 'kmrinal@gmail.com';
        displayPhone = '+91-9916164906';
        callTo = '9916164906';
      break
    }

    this.setState({
      mailTo:mailTo,
      displayPhone:displayPhone,
      callTo:callTo
    });
  }

  checkForValidations = () => {
    if(!this.state.name) {
      alert('please enter Name')
    } else if (!this.state.email && !this.validateEmail(this.state.email)) {
      alert(i18n.t('contact.emailvalidation'))
    } else if (!this.state.message) {
      alert('please enter Message')
    } else {
      if(Platform.OS === 'ios') {
        Communications.email(this.state.mailTo.toString(), null, null, 'Tape Calculator - Contact', this.state.message);
      } else {
        var SendIntentAndroid = require('react-native-send-intent');
        SendIntentAndroid.sendMail(this.state.mailTo, 'Tape Calculator - Contact', this.state.message);
      }
      // app.post('/send-email', function (req, res) {
      //   let transporter = nodeMailer.createTransport({
      //       host: 'smtp.1und1.de',
      //       port: 587,
      //       secure: false,
      //       auth: {
      //           user: 'info@itpe-germany.de',
      //           pass: 'Itpe!9877'
      //       }
      //   });
      //   let mailOptions = {
      //       from: '"Tesa" <nagasudheerbolla@gmail.com>', // sender address
      //       to: "nagasudheerbolla@gmail.com", // list of receivers
      //       subject: "Subject", // Subject line
      //       text: "Body message", // plain text body
      //   };
      //
      //   transporter.sendMail(mailOptions, (error, info) => {
      //       if (error) {
      //         alert(error);
      //           return console.log(error);
      //       }
      //       console.log('Message %s sent: %s', info.messageId, info.response);
      //         alert('Message %s sent: %s', info.messageId, info.response);
      //       });
      //   });
      //
      //   app.listen(port, function(){
      //     console.log('Server is running at port: ',port);
      //   });

    }
  }

  validateEmail = () => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(this.state.email);
  };

  render() {
    const { params } = this.props.navigation.state;
    const textLength = this.state.message.length;
    const textLimit = 1000 - textLength;
    const callTo = {
      number: this.state.callTo,
      prompt: false
    };
    return (
      <Grid>
        <NavBar
          onBack={() => {
            this.props.navigation.goBack();
          }}
          title={params.title}
        />
        <View style={{ flex: 1 }}>

          <ScrollView keyboardDismissMode='on-drag'
                keyboardShouldPersistTaps="always">
            <View style={styles.form}>

              <View style={styles.field}>
                <TextInput
                  returnKeyType={ "next" }
                  ref={(input) => { this.nameTextInput = input; }}
                  maxLength={48}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholderTextColor={COLORS.DARK_GREY}
                  placeholder={applyLetterSpacing(i18n.t('contact.name').toUpperCase(), 1)}
                  style={styles.input}
                  blurOnSubmit={false}
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                  onSubmitEditing={() => { this.firmTextInput.focus(); }}
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  ref={(input) => { this.firmTextInput = input; }}
                  maxLength={48}
                  returnKeyType={ "next" }
                  blurOnSubmit={false}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholderTextColor={COLORS.DARK_GREY}
                  placeholder={applyLetterSpacing(i18n.t('contact.firw').toUpperCase(), 1)}
                  style={styles.input}
                  value={this.state.firm}
                  onChangeText={text => this.setState({ firm: text })}
                  onSubmitEditing={() => { this.emailTextInput.focus(); }}
                />
              </View>

              <View style={styles.field}>
                <TextInput
                  ref={(input) => { this.emailTextInput = input; }}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholderTextColor={COLORS.DARK_GREY}
                  returnKeyType={ "next" }
                  blurOnSubmit={false}
                  placeholder={applyLetterSpacing(i18n.t('contact.email').toUpperCase(), 1)}
                  style={styles.input}
                  value={this.state.email}
                  onChangeText={text => this.setState({ email: text })}
                  onSubmitEditing={() => { this.messageTextInput.focus(); }}
                />
              </View>

              <View style={styles.fieldDescription}>
                <TextInput
                  ref={(input) => { this.messageTextInput = input; }}
                  maxLength={1000}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  returnKeyType={ "done" }
                  placeholderTextColor={COLORS.DARK_GREY}
                  placeholder={applyLetterSpacing(i18n.t('contact.message').toUpperCase(), 1)}
                  multiline={true}
                  style={styles.inputDescription}
                  value={this.state.message}
                  onChangeText={text => this.setState({ message: text })}
                />
              </View>

              <Text style={styles.footerDescription}>{applyLetterSpacing(`${textLimit}`+' '+i18n.t('contact.characters'), 5)}</Text>
              {/* <Text style={styles.footerDescription}>{applyLetterSpacing(textLimit.toString()+" "+ 'contact.characters', 5)}</Text> */}
            </View>

            <View style={styles.row}>
              <TouchableOpacity onPress={() => {
                if(this.state.callTo) {
                  Communications.phonecall(this.state.callTo.toString(), false)
                }
              }}>
                <View style={styles.rowItem}>
                  <ImageBackground source={require('../images/180310_PHONE.png')} style={styles.image}>
                    <Text style={[styles.rowLabel, { paddingTop: 70 }]}>{applyLetterSpacing(i18n.t('contact.call').toUpperCase(), 1)}</Text>
                    <Text style={styles.rowLabel}>{applyLetterSpacing(this.state.displayPhone, 1)}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.checkForValidations}>
                <View style={[styles.rowItem, styles.mailButton]}>
                  <ImageBackground source={require('../images/180310_MAIL.png')} style={styles.image}>
                    <Text style={[styles.rowLabel, { paddingTop: 70 }]}>{applyLetterSpacing(i18n.t('contact.send'), 1)}</Text>
                    <Text style={styles.rowLabel}>{applyLetterSpacing(' ', 1)}</Text>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => {
                  Communications.web('https://www.tesa.com/about-tesa/legal-information/imprint');
                }}
              >
                <Text style={styles.footerText}>{applyLetterSpacing(i18n.t('contact.imprint'), 1)}</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}> | </Text>
              <TouchableOpacity
                onPress={() => {
                  Communications.web('https://www.tesa.com/about-tesa/legal-information/privacy-policy');
                }}
              >
                <Text style={styles.footerText}>{applyLetterSpacing(i18n.t('contact.privacy').toUpperCase(), 1)}</Text>
              </TouchableOpacity>
              <Text style={styles.footerText}> | </Text>

              <TouchableOpacity
                onPress={() => {
                  Communications.web('https://www.tesa.com/about-tesa/legal-information/conditions-of-use');
                }}
              >
                <Text style={styles.footerText}>{applyLetterSpacing(i18n.t('contact.condition'), 1)}</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </View>
      </Grid>
    );
  }
}

const { width } = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;
const cubeWidth = (width - 30) / 2;
const styles = StyleSheet.create({
  column: {
    width: columnWidth,
    height: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    paddingTop: 10,
    marginBottom: 50
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
    marginLeft: 15,
    textAlignVertical: "top"
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
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 15
  },
  footerText: {
    color: COLORS.DARK_GREY,
    fontFamily: FONTS.FONT_BOLD
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    top: -3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Calculation;
