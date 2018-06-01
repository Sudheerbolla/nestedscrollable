'use strict';

import React, { Component } from 'react';

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
        <View style={styles.coreDiameterText}>
          <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_LIGHT, fontSize: 15 }}>
            {applyLetterSpacing(i18n.t('calculation_consumptation.punch_line'), 1)}
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
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

            <View style={{ height: 33 }} />

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

            <View style={{ height: 60 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('calculation_consumptation.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.consumptationValueInM2, 1)}
                </MarqueeText>
              </View>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={{ height: 52.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>m</Text>
            </View>

            <View style={{ height: 60.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 38 }} />

            <View style={styles.resultUnitContainer}>
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

        <View style={{ height: 125, justifyContent: 'center', paddingRight: 25, marginTop:10 }}>
          <Text style={{color: COLORS.DARK_GREY}}>{applyLetterSpacing(i18n.t('calculation_consumptation.without_waste'), 1)}</Text>
        </View>

        <View style={{ height: 35 }} />
      </ScrollView>
      </Grid>
    );
  }

}

const styles = StyleSheet.create({
  resultUnitContainer: {},
  unitItem: {
    height: 35,
    paddingTop: 3,
  },
  resultContainer: {
    flexDirection: 'row',
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
  picker: {
    height: 85,
    top: -70,
  },
  unitContainer: {
    width: 100,
    ...Platform.select({
      android: {
        paddingTop: 105,
      },
    }),
  },
  unitWidth: {
    height: 42,
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitWidthLabel: {
    fontSize: 15,
    color: COLORS.DARK_GREY,
  },
  pickerTopBorder: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    width: 70,
    top: 20,
    left: 15,
    ...Platform.select({
      android: {
        top: 110,
      },
    }),
  },
  pickerBottomBorder: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: COLORS.DARK_GREY,
    width: 70,
    bottom: 30,
    left: 15,
    ...Platform.select({
      android: {
        bottom: 20,
      },
    }),
  },
  coreDiameterText: {
    height: 85,
    justifyContent: 'center',
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
