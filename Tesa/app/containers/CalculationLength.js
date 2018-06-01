'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  Dimensions,
  Platform,
  ImageBackground,
  ScrollView,
  Share,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import { Grid, DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';
var needToReplaceDotWithComma=false;

const { width, height } = Dimensions.get('window');

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'm2',
      areaValue: Platform.OS === 'ios'?i18n.t('calculation_length.areaValue'):'4.80',
      widthValue: Platform.OS === 'ios'?i18n.t('calculation_area.widthValue'):'0.019',
      lengthValueInM:'0',
      lengthValueInY:'0',
      lengthValueInI:'0',
      lengthValueInF:'0',
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
        			alignItems: 'center',
          		}}>
                <SupText
                  textStyle={[styles.text, { color: COLORS.DARK_GREY }]}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11, color: COLORS.DARK_GREY }}
                  style={styles.unitItem}
                  text={getLabel(selectedItem)}
                />
            </View>
          )}
        </View>
      </View>
    );
  }

  updateAllValues = () => {
    if(this.state.areaValue.includes(',')||this.state.widthValue.includes(','))
      needToReplaceDotWithComma=true
    else needToReplaceDotWithComma=false

    this.setState({
      lengthValueInM:this.getCalculatedValue('m2'),
      lengthValueInY:this.getCalculatedValue('yards2'),
      lengthValueInF:this.getCalculatedValue('feet2'),
      lengthValueInI:this.getCalculatedValue('inches2')
    });
  }

  getCalculatedValue = (conv) => {
    var outPut = '';
    var areaValue=this.state.areaValue;
    var widthValue=this.state.widthValue;
    if(Platform.OS === 'ios') {
      if(areaValue.includes(',')){
         areaValue = areaValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
      if(widthValue.includes(',')){
         widthValue = widthValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
    }

    if (this.state.unit == 'm2') {
      var lengthInM=areaValue / widthValue;
      if (conv == 'm2')
        outPut = lengthInM
      else if (conv == 'yards2') {
        outPut = 1.09361 * lengthInM
      } else if (conv == 'feet2') {
        outPut = 3.28084 * lengthInM
      } else if (conv == 'inches2') {
        outPut = 39.3701 * lengthInM
      }
    } else if (this.state.unit == 'yards2') {
      var lengthInY=areaValue / widthValue;
      if (conv == 'm2')
        outPut = 0.9144 * lengthInY
      else if (conv == 'yards2') {
        outPut = lengthInY
      } else if (conv == 'feet2') {
        outPut = 3 * lengthInY
      } else if (conv == 'inches2') {
        outPut = 36 * lengthInY
      }
    } else if (this.state.unit == 'feet2') {
      var lengthInF=areaValue / widthValue;
      if (conv == 'm2')
        outPut = 0.3048 * lengthInF
      else if (conv == 'yards2') {
        outPut = 0.333333 * lengthInF
      } else if (conv == 'feet2') {
        outPut = lengthInF
      } else if (conv == 'inches2') {
        outPut = 12 * lengthInF
      }
    } else if (this.state.unit == 'inches2') {
      var lengthInI=areaValue / widthValue;
      if (conv == 'm2')
        outPut = 0.0254*lengthInI
      else if (conv == 'yards2') {
        outPut = 0.0277778 * lengthInI
      } else if (conv == 'feet2') {
        outPut = 0.0833333 * lengthInI
      } else if (conv == 'inches2') {
        outPut = lengthInI
      }
    }
    outPut=this.round(outPut, 3);
    if(needToReplaceDotWithComma){
      if(outPut.toString().includes('.')){
         outPut = outPut.toString().replace('.', ',');
      }
    }
    return outPut.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Length';

    let textToShare='Input: \n'+ 'Area: '+this.state.areaValue+' '+this.state.unit+', Width: '+this.state.widthValue+' '+this.state.unit.toString().slice(0, -1)+'\n \n Result: \n'
    + this.state.lengthValueInM +' m'
    +'\n'+this.state.lengthValueInY+' yards'
    +'\n'+this.state.lengthValueInF+' feet'
    +'\n'+this.state.lengthValueInI+' inches';

    if(Platform.OS === 'ios') {
      Share.share({
        message: textToShare,
        subject: emailsubject
      }, {
        subject: emailsubject,
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

  validateDecimal3 = (value) => {
    var RE=''
    if(value.toString().includes(',') && needToReplaceDotWithComma){
      RE = /^\d*\,?\d{0,3}$/
    } else
      RE = /^\d*\.?\d{0,3}$/
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

            <View style={styles.container}>

              <View style={{ height: 35 }} />

              <View style={styles.horizontalStyle}>

                <View style={{width:'70%'}}>

                  <DetailTextInput
                    title={i18n.t('calculation_length.area').toUpperCase()}
                    value={this.state.areaValue}
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
                        if(this.isNumberGreaterThanLimit(number , 10000000)){
                          alert(i18n.t('converter_area.outOfRangeAlert'));
                          return;
                        }
                        if(!this.validateDecimal(number)) {
                          alert(i18n.t('converter_area.outOfRangeAlert'));
                          return;
                        }
                      }

                      this.setState({ areaValue: number },function(){this.updateAllValues()});
                      }
                    }
                  />

                </View>

                <View style={{ width: '30%',padding:8,marginTop:25 }}>
                  <View style={{
                    borderWidth: 1,
                    borderColor: COLORS.DARK_GREY
                  }} />
                      <CustomPicker
                        options={['yards2', 'm2', 'feet2', 'inches2']}
                        fieldTemplate={this.renderField}
                        style={{ margin: 5, height: 22 }}
                        value={this.state.unit}
                        onValueChange={(value) => {
                          this.setState({ unit: value },function(){this.updateAllValues()});
                        }}
                      />
                  <View style={{
                    borderWidth: 1,
                    borderColor: COLORS.DARK_GREY
                  }} />
                </View>

              </View>

              <View style={{height: 35 }} />

              <View style={styles.horizontalStyle}>

                <View style={{width:'70%'}}>

                  <DetailTextInput
                    title={i18n.t('calculation_length.width').toUpperCase()}
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
                        if(this.isNumberGreaterThanLimit(number , 10000)){
                          alert(i18n.t('converter_area.outOfRangeAlert'));
                          return;
                        }
                        if(!this.validateDecimal3(number)) {
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
                           <Text style={{ marginTop: 5, height: 22 }}>{this.state.unit}</Text>
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
                  {applyLetterSpacing(i18n.t('calculation_length.result').toUpperCase(), space)}
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
                             {applyLetterSpacing(this.state.lengthValueInM, 1)}
                    </MarqueeText>
                  </View>

                  <View style={{width:'30%'}}>
                    <SupText
                      textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                      supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                      style={styles.unitItem}
                      text={'m'}
                    />
                  </View>

                  </View>

                  <View style={styles.resultContainerNew}>

                  <View style={styles.resultValue}>
                    <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                             {applyLetterSpacing(this.state.lengthValueInY, 1)}
                    </MarqueeText>
                  </View>

                  <View style={{width:'30%'}}>
                    <SupText
                      textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                      supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                      style={styles.unitItem}
                      text={'yards'}
                    />
                  </View>

                  </View>

                  <View style={styles.resultContainerNew}>

                  <View style={styles.resultValue}>
                    <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                             {applyLetterSpacing(this.state.lengthValueInF, 1)}
                    </MarqueeText>
                  </View>

                  <View style={{width:'30%'}}>
                    <SupText
                      textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                      supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                      style={styles.unitItem}
                      text={'feet'}
                    />
                  </View>

                  </View>

                  <View style={styles.resultContainerNew}>

                  <View style={styles.resultValue}>
                    <MarqueeText style={styles.number} duration={3000} loop  marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                             {applyLetterSpacing(this.state.lengthValueInI, 1)}
                    </MarqueeText>
                  </View>

                  <View style={{width:'30%'}}>
                    <SupText
                      textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                      supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                      style={styles.unitItem}
                      text={'inches'}
                    />
                  </View>

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
    flex: 1,
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
    paddingRight:5
  }
});
export default Details;
