'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground, ScrollView, Share, KeyboardAvoidingView, Image } from 'react-native';
import { Grid, DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';

const { width, height } = Dimensions.get('window');
var needToReplaceDotWithComma=false;

export default class CalculationConsumptation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lengthValue: Platform.OS === 'ios'?i18n.t('calculation_consumptation.lengthValue'):'66.00',
      widthValue: '205',
      consumptationValueInM2: '13530000',
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

  validateDecimal = (value) => {
    var RE=''
    if(value.toString().includes(',') && needToReplaceDotWithComma){
      RE = /^\d*\,?\d{0,2}$/
    } else
      RE = /^\d*\.?\d{0,2}$/
    return RE.test(value);
  }

  updateAllValues = () => {
    if(this.state.lengthValue.includes(',')||this.state.widthValue.includes(','))
      needToReplaceDotWithComma=true
    else needToReplaceDotWithComma=false

    this.setState({
      consumptationValueInM2:this.getCalculatedValue()
    });
  }

  getCalculatedValue = () => {
    // var outPut = this.state.lengthValue?this.state.lengthValue:'66' * (this.state.widthValue?this.state.widthValue:'205') * 1000;
    // var outPut = this.state.lengthValue * (this.state.widthValue * 0.001) * 1000;
    var length=this.state.lengthValue;
    var width=this.state.widthValue;
    if(Platform.OS === 'ios') {
      if(length.includes(',')){
         length = length.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
      if(width.includes(',')){
         width = width.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
    }

    var outPut = length * width * 0.001;
    outPut=this.round(outPut, 3);
    if(needToReplaceDotWithComma){
      if(outPut.toString().includes('.')){
         outPut = outPut.toString().replace('.', ',');
      }
    }
    return outPut.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Consumption';

    let textToShare='Input: \n'+ 'Length: '+this.state.lengthValue+' mm, Width: '+this.state.widthValue+' μm \n\n'
    +'Result: \n'
    + this.state.consumptationValueInM2 +' m2';

    if(Platform.OS === 'ios') {
      Share.share({
        message: textToShare,
        subject: emailsubject
      }, {
        subject: emailsubject,
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
    }else
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

            <ScrollView>

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

                  <View style={styles.coreDiameterText}>

                    <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_LIGHT, fontSize: 15 }}>
                      {applyLetterSpacing(i18n.t('calculation_consumptation.punch_line'), 1)}
                    </Text>

                  </View>

                  <View style={styles.container}>

                    <View style={{ height: 35 }} />

                    <View style={styles.horizontalStyle}>

                      <View style={{width:'70%'}}>

                        <DetailTextInput
                          title={i18n.t('calculation_consumptation.length_x').toUpperCase()}
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
                              if(this.isNumberGreaterThanLimit(number, 100000)){
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

                    <View style={{height: 35 }} />

                    <View style={styles.horizontalStyle}>

                      <View style={{width:'70%'}}>

                        <DetailTextInput
                          title={i18n.t('calculation_consumptation.width_y').toUpperCase()}
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
                              if(this.isNumberGreaterThanLimit(number, 100000)){
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

                    <View style={{ height: 75 }} />

                    <View style={{
                      flexDirection: 'row',
                      flexGrow: 1,
                      width:'100%',
                      alignSelf: "stretch",
                    }}>

                    <View style={{width:'24%'}}>
                      <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, color: COLORS.DARK_GREY, margin:5 }}>
                        {applyLetterSpacing(i18n.t('calculation_consumptation.result').toUpperCase(), space)}
                      </Text>
                    </View>

                    <View style={{
                      width:'76%',
                      flexGrow: 1,
                      justifyContent: 'center',
                      alignSelf: "stretch",
                      alignItems: 'center',
                    }}>

                      <View style={styles.resultContainerNew}>
                        <View style={styles.resultValue}>
                          <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                                   {applyLetterSpacing(this.state.consumptationValueInM2, 1)}
                          </MarqueeText>
                        </View>

                        <View style={{width:'30%'}}>
                          <SupText
                            textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                            supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                            style={styles.unitItem}
                            text={'m'}
                            sup={'2'}
                          />
                        </View>

                      </View>

                    </View>

                    </View>

                  </View>

                  <View style={{ height: 125, justifyContent: 'center', paddingRight: 25, marginTop:10 }}>
                    <Text style={{color: COLORS.DARK_GREY}}>{applyLetterSpacing(i18n.t('calculation_consumptation.without_waste'), 1)}</Text>
                  </View>

                </View>

                <View style={{ height: 60 }} />

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
  coreDiameterText: {
    marginTop:22,
    justifyContent: 'center',
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
    width:'70%',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    paddingRight:10
  }
});
