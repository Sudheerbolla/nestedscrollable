'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground, ScrollView, Share, Image, KeyboardAvoidingView} from 'react-native';
import { Grid, DetailTextInput } from '../components';
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
      unit: 'pro m',
      priceValue: '20',
      lengthValue: Platform.OS === 'ios'?i18n.t('calculation_area.lengthValue'):'66.00',
      widthValue: '205',
      pricePerRoll:'280'
    };
  }

  componentDidMount(){
    this.updateAllValues();
  }

  componentWillUnmount(){
    needToReplaceDotWithComma=false;
  }

  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={{
              justifyContent: 'center',
              alignSelf: "stretch",
              alignItems: 'center'
            }}>
                <SupText
                  textStyle={[styles.text, { color: COLORS.DARK_GREY }]}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11, color: COLORS.DARK_GREY }}
                  style={styles.unitItem}
                  text={getLabel(selectedItem)}
                  sup={''}
                />
            </View>
          )}
        </View>
      </View>
    );
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
    var pricePerRoll='';
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
// 'pro 100m', 'pro m', 'pro m2'
    if (this.state.unit == 'pro 100m') {
      pricePerRoll=priceValue*widthValue*0.001*lengthValue;
    } else if (this.state.unit == 'pro m') {
      pricePerRoll=priceValue*widthValue*0.001*lengthValue;
    } else if (this.state.unit == 'pro m2') {
      pricePerRoll=priceValue*widthValue*0.001*lengthValue;
    }

    pricePerRoll=this.round(pricePerRoll, 3);
    if(needToReplaceDotWithComma){
      if(pricePerRoll.toString().includes('.')){
         pricePerRoll = pricePerRoll.toString().replace('.', ',');
      }
    }
    return pricePerRoll.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Price /roll';

    let textToShare='Input: \n'+ 'Price: '+this.state.priceValue+' m, Width: '+this.state.widthValue+' mm, Length: '+this.state.lengthValue+' m \n \n Result: \n'
    + this.state.pricePerRoll +' Price/roll';

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
      <KeyboardAvoidingView behavior={'padding'}>
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

                <View style={{ height: Platform.OS === 'android'?35:-25 }} />

                <View style={styles.horizontalStyle}>

                  <View style={{width:'67%'}}>

                    <DetailTextInput
                      title={i18n.t('calculation_price.price').toUpperCase()}
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
                  <View style={{ width: '33%',padding:8,marginTop:Platform.OS === 'android'?25:0 }}>
                    <View style={{
                      borderWidth: 1,
                      borderColor: Platform.OS === 'android'?COLORS.DARK_GREY:COLORS.WHITE
                    }} />
                    {Platform.select({
                      android: (
                        <CustomPicker
                          options={['pro 100m', 'pro m', 'pro m2']}
                          fieldTemplate={this.renderField}
                          style={{ margin: 5, height: 22 }}
                          value={this.state.unit}
                          onValueChange={(value) => {
                            this.setState({ unit: value },function(){this.updateAllValues()});
                          }}
                        />),
                      ios: (
                        <Picker
                          selectedValue={this.state.unit}
                          itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                          onValueChange={(itemValue, itemIndex) => {
                            this.setState({ unit: itemValue },function(){this.updateAllValues()});
                          }}>
                          <Picker.Item label="pro	100m" value="pro	100	m" />
                          <Picker.Item label="pro	m" value="pro m" />
                          <Picker.Item label="pro	m2" value="pro m2" />
                        </Picker>
                      ),
                    })}
                    <View style={{
                      borderWidth: 1,
                      borderColor: Platform.OS === 'android'?COLORS.DARK_GREY:COLORS.WHITE
                    }} />
                  </View>
                </View>

                <View style={{height: Platform.OS === 'android'?35:-25 }} />

                <View style={styles.horizontalStyle}>

                  <View style={{width:'70%'}}>

                    <DetailTextInput
                      title={i18n.t('calculation_price.length').toUpperCase()}
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
                          if(this.isNumberGreaterThanLimit(number , 100000)){
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
                  <View style={{ width: '30%',padding:8,marginTop:Platform.OS === 'android'?25:2 }}>
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
                        title={i18n.t('calculation_price.width').toUpperCase()}
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
                    <View style={{ width: '30%',padding:8,marginTop:Platform.OS === 'android'?25:2 }}>
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
                    {applyLetterSpacing(i18n.t('calculation_price.result').toUpperCase(), space)}
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

                      <View style={{width:'30%'}}>
                        <SupText
                         textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 16 }}
                         supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                         style={styles.unitItem}
                         text={i18n.t('calculation_price.price_roll').toUpperCase()}
                       />
                      </View>

                    </View>

                </View>

                </View>

            </View>

            <View style={{ height: 80 }} />

            <View style={styles.footerContainer}>

              <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />

            </View>
          </ScrollView>
      </KeyboardAvoidingView>
    );
  }

}
{/* <CustomPicker
  options={['pro 100m', 'pro m', 'pro m2']}
  fieldTemplate={this.renderField}
  style={{ margin: 5, height: 22 }}
  value={this.state.unit}
  onValueChange={(value) => {
    this.setState({ unit: value },function(){this.updateAllValues()});
  }}
/> */}
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
    flexGrow: 1,
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
    paddingRight:5
  }
});

export default Details;
