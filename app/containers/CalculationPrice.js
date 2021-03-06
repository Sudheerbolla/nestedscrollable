'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground, ScrollView, Share } from 'react-native';
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
      unit: '€/m2',
      priceValue: '20',
      lengthValue: Platform.OS === 'ios'?i18n.t('calculation_area.lengthValue'):'66.00',
      widthValue: '205',
      pricePerRoll:'280'
    };
  }
//   <SupText
    // textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 16 }}
    // supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
    // style={styles.unitWidthLabel}
    // text={'€/m'}
    // sup={'2'}/>
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
            <View style={styles.innerContainer}>
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

    if (this.state.unit == '€/m2') {
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

    let textToShare='Input: \n'+ 'Price: '+this.state.priceValue+' €/m2, Width: '+this.state.widthValue+' mm, Length: '+this.state.lengthValue+' m \n \n Result: \n'
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
    return (
      <Grid>
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
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.clearSpace} />

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

            <View style={{ height: 33 }} />

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

            <View style={{ height: 26 }} />

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

            <View style={{ height: 60 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('calculation_price.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.pricePerRoll, 1)}
                </MarqueeText>

              </View>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={{ height: 24 }} />

            <View style={styles.unitContainer}>
              <View style={styles.pickerTopBorder} />

                 <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 16 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={[styles.unitWidthLabel,{paddingLeft: 40, marginTop: 15, height: 20}]}
                  text={'€/m'}
                  sup={'2'}/>


              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={styles.unitWidth}>
              <Text style={[styles.unitWidthLabel,{paddingLeft: 5, marginTop: 15, height: 20,fontSize: 15}]}>m</Text>
            </View>

            <View style={{ height: Platform.select({ ios: 54, android: 65 }) }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 38.5 }} />

            <View style={styles.resultUnitContainer}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 13 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={applyLetterSpacing(i18n.t('calculation_price.price_roll'), 1)}
              />
            </View>
          </View>
        </View>
        <View style={{ height: 35 }} />
        </ScrollView>
      </Grid>
    );
  }

}

const styles = StyleSheet.create({
  resultUnitContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        paddingTop: 90,
      },
    }),
  },
  unitItem: {
    height: 35,
    paddingTop: 3,
  },
  resultContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  resultNumber: {
    flex: 1,
    top: 3,
    alignItems: 'flex-end',
    paddingRight: 18,
  },
  number: {
    fontSize: 20,
    height: 35,
    color: COLORS.DARK_GREY,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flex: 0.45,
    position: 'relative',
  },
  unitContainer: {
    width: 100,
    ...Platform.select({
      android: {
        paddingTop: 82,
      },
    }),
  },
  unitWidth: {
    height: 42,
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        top: 60,
      },
    }),
  },
  unitWidthLabel: {
    fontSize: 15,
    color: COLORS.DARK_GREY,
  },
  pickerTopBorder: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.BLANK,
    width: 70,
    top: 95,
    left: 15,
    ...Platform.select({
      android: {
        top: 95,
      },
    }),
  },
  pickerBottomBorder: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.BLANK,
    width: 70,
    bottom: 91,
    left: 15,
    ...Platform.select({
      android: {
        bottom: -10,
      },
    }),
  },
  clearSpace: {
    height: 85,
  },
  input: {
    height: 42,
    backgroundColor: COLORS.BLUE_3,
    color: COLORS.BLUE,
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Details;
