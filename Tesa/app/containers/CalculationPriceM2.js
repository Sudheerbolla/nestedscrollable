'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground, ScrollView, Share, Image, KeyboardAvoidingView } from 'react-native';
import { DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';

const { width, height } = Dimensions.get('window');

var needToReplaceDotWithComma=false;

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'Roll',
      priceValue:'0',
      lengthValue: Platform.OS === 'ios'?i18n.t('calculation_area.lengthValue'):'66.00',
      widthValue: '19',
      pricePerRoll:'0'
    };
  }

  componentDidMount(){
    this.updateAllValues();
  }

  componentWillUnmount(){
    needToReplaceDotWithComma=false;
  }

  round(number, precision) {
    var shift = function (number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  updateAllValues = () => {
    if(this.state.priceValue.includes(',')||this.state.lengthValue.includes(',')||this.state.widthValue.includes(','))
      needToReplaceDotWithComma=true
    else needToReplaceDotWithComma=false

    this.setState({
      pricePerRoll:this.getCalculatedValue(),
    });
  }

  getCalculatedValue = () => {
    var priceValue=this.state.priceValue;
    var lengthValue=this.state.lengthValue;
    var widthValue=this.state.widthValue;
    if(Platform.OS === 'ios') {
      if(priceValue.includes(',')){
         priceValue = priceValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
      if(lengthValue.includes(',')){
         lengthValue = lengthValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
      if(widthValue.includes(',')){
         widthValue = widthValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
    }
    var pricePerRoll=priceValue*(widthValue*0.001)*lengthValue;
    pricePerRoll=this.round(pricePerRoll, 3);
    if(needToReplaceDotWithComma){
      if(pricePerRoll.toString().includes('.')){
         pricePerRoll = pricePerRoll.toString().replace('.', ',');
      }
    }
    return pricePerRoll.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Price/M2';

    let textToShare='Input: \n'+ 'Price: '+this.state.priceValue+' m , Width: '+this.state.widthValue+' mm, Length: '+this.state.lengthValue+' m'
    +'\n'+'\n'
    +'Result: \n'
    + this.state.pricePerRoll +' Price/M2';

    if(Platform.OS === 'ios') {
      Share.share({
        message: textToShare,
        subject: emailsubject
      }, {
        dialogTitle: emailsubject,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter',
        ]
      })
      .then(this._showResult)
      .catch(err => console.log(err))
    } else{
      Share.share({
        message: textToShare,
        title: emailsubject,
        url: textToShare,
        subject: emailsubject
      }, {
        dialogTitle: emailsubject,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter',
        ],
        tintColor: 'green'
      })
      .then(this._showResult)
      .catch(err => console.log(err))
    }

  }

  validateDecimal = (value) => {
    var RE=''
    if(value.toString().includes(',') && needToReplaceDotWithComma){
      RE = /^\d*\,?\d{0,2}$/
    } else
      RE = /^\d*\.?\d{0,2}$/
    return RE.test(value);
  }

  isNumberGreaterThanLimit = (value,limit) => {
    return parseFloat(value) > limit;
  }

  hasMoreThanOneDecimalPoints = (value) => {
    return ((value.split('\.').value-1)>1||(value.split('\,').value-1)>1);
  }

  render() {
    const { params } = this.props.navigation.state;
    const space = Platform.select({ ios: 5, android: 2 });

    return (
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
          <ScrollView style={{flexGrow: 1}}>

            <View style={styles.grid}>

              <View style={styles.logoContainer}>
                <Image source={ICONS.LOGO} style={styles.logo} />
              </View>

              <View style={{ height: 22 }} />

              <NavBarDetail
                onBack={() => {
                  this.props.navigation.goBack();
                }}
                title={params.title}
                rightButton={true}
                onRight={() => {
                  this.shareTextWithTitle();
                }}
              />

              <View style={styles.container}>

                <View style={{ height: 35 }} />

                <View style={styles.horizontalStyle}>

                  <View style={{width:'70%'}}>

                    <DetailTextInput
                      title={i18n.t('calculation_price_m2.price').toUpperCase()}
                      value={this.state.priceValue}
                      onChangeText={(number) => {
                        if(number){
                          if(Platform.OS === 'android') {
                            number = number.replace(/[^\d.,-]/g, '');
                            if(number.includes(',')){
                               number=number.toString().replace(',','.');
                            }
                          } else {
                            if(number.includes(',')){
                               needToReplaceDotWithComma=true;
                            }
                          }
                          if(this.hasMoreThanOneDecimalPoints(number)){
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                          if(this.isNumberGreaterThanLimit(number , 1000000)){
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                          if(!this.validateDecimal(number)) {
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                        }
                        this.setState({ priceValue: number },function(){this.updateAllValues()});
                        }
                      }
                    />

                  </View>

                  <View style={{ width: '30%',padding:8,marginTop:25 }}>
                    <View style={{justifyContent: 'center',
                          alignSelf: "stretch",
                          alignItems: 'center'}}>
                           <Text style={{ marginTop: 5, height: 22 }}>{applyLetterSpacing(i18n.t('calculation_price_m2.roll'), 1)}</Text>
                    </View>
                  </View>

                </View>

                <View style={{height: 35 }} />

                <View style={styles.horizontalStyle}>

                  <View style={{width:'70%'}}>

                    <DetailTextInput
                      title={i18n.t('calculation_price_m2.length').toUpperCase()}
                      value={this.state.lengthValue}
                      onChangeText={(number) => {

                        if(number){
                          if(Platform.OS === 'android') {
                            number = number.replace(/[^\d.,-]/g, '');
                            if(number.includes(',')){
                               number=number.toString().replace(',','.');
                            }
                          } else {
                            if(number.includes(',')){
                               needToReplaceDotWithComma=true;
                            }
                          }
                          if(this.hasMoreThanOneDecimalPoints(number)){
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                          if(this.isNumberGreaterThanLimit(number , 1000000)){
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                          if(!this.validateDecimal(number)) {
                            alert(i18n.t('converter_area.outOfRangeAlert'));
                            return;
                          }
                        }

                        this.setState({ lengthValue: number },function(){this.updateAllValues()});
                        }
                      }
                    />

                  </View>

                  <View style={{ width: '30%',padding:8,marginTop:25 }}>
                    <View style={{justifyContent: 'center',
                          alignSelf: "stretch",
                          alignItems: 'center'}}>
                           <Text style={{ marginTop: 5, height: 22 }}>m</Text>
                    </View>
                  </View>
                    </View>

                </View>

                <View style={{height: 35 }} />

                <View style={styles.horizontalStyle}>
                    <View style={{width:'70%'}}>

                      <DetailTextInput
                        title={i18n.t('calculation_price_m2.width').toUpperCase()}
                        value={this.state.widthValue}
                        onChangeText={(number) => {
                          if(number){
                            if(Platform.OS === 'android') {
                              number = number.replace(/[^\d.,-]/g, '');
                              if(number.includes(',')){
                                 number=number.toString().replace(',','.');
                              }
                            } else {
                              if(number.includes(',')){
                                 needToReplaceDotWithComma=true;
                              }
                            }
                            if(this.hasMoreThanOneDecimalPoints(number)){
                              alert(i18n.t('converter_area.outOfRangeAlert'));
                              return;
                            }
                            if(this.isNumberGreaterThanLimit(number , 1000000)){
                              alert(i18n.t('converter_area.outOfRangeAlert'));
                              return;
                            }
                            if(!this.validateDecimal(number)) {
                              alert(i18n.t('converter_area.outOfRangeAlert'));
                              return;
                            }
                          }

                          this.setState({ widthValue: number },function(){this.updateAllValues()});
                          }
                        }
                      />

                    </View>
                    <View style={{ width: '30%',padding:8,marginTop:25 }}>
                        <View style={{justifyContent: 'center',
                              alignSelf: "stretch",
                              alignItems: 'center'}}>
                               <Text style={{ marginTop: 5, height: 22 }}>mm</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 85 }} />

                <View style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  width:'100%',
                  alignSelf: "stretch",
                }}>

                <View style={{width:'24%'}}>
                  <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, color: COLORS.DARK_GREY, margin:5 }}>
                    {applyLetterSpacing(i18n.t('calculation_price_m2.result').toUpperCase(), space)}
                  </Text>

                </View>

                <View style={{
                        width:'76%',
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignSelf: "stretch",
                        alignItems: 'center'
                      }}>

                    <View style={styles.resultContainerNew}>

                      <View style={styles.resultValue}>
                        <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                                 {applyLetterSpacing(this.state.pricePerRoll, 1)}
                        </MarqueeText>
                      </View>

                      <View style={{width:'35%'}}>
                        <SupText
                         textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}
                         supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                         style={styles.unitItem}
                         text={applyLetterSpacing(i18n.t('calculation_price_m2.price_m2'), 1)}
                         sup={'2'}
                       />

                      </View>

                    </View>

                </View>

                </View>

              </View>

            <View style={{ height: 40 }} />

            <View style={styles.footerContainer}>

              <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />

            </View>

          </ScrollView>

      </KeyboardAvoidingView>
    );

  }
}

const styles = StyleSheet.create({
  horizontalStyle:{
    flexDirection: 'row',
    flexGrow: 1,
    width:'100%',
    justifyContent: 'center',
    alignSelf: "stretch",
    alignItems: 'center',
  },
  unitItem: {
    height: 35,
    paddingTop: 3,
    marginLeft: 10
  },
  number: {
    fontSize: 20,
    height: 35,
    color: COLORS.DARK_GREY,
    textAlign:'right',
    marginLeft:10,
    marginRight:10
  },
  container: {
    flexGrow: 1
  },
  grid: {
    flex: 1,
    marginHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    padding: 0,
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.43,
    marginRight: -1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: -5,
  },
  brandBar: {
    width: width,
    resizeMode: 'contain',
  },
  resultContainerNew:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: "stretch",
    alignItems: 'center',
  },
  resultValue:{
    width:'65%',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    paddingRight:5
  }
});

export default Details;
