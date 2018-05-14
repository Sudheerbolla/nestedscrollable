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

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'Roll',
      priceValue:'0',
      lengthValue: '66.00',
      widthValue: '19',
      pricePerRoll:'0'
    };
  }

  componentDidMount(){
    this.updateAllValues();
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

  getNewChar(str){
    return str[str.length - 1];
  }

  updateAllValues = () => {
    this.setState({
      pricePerRoll:this.getCalculatedValue(),
    });
  }

  getCalculatedValue = () => {
    var pricePerRoll=this.state.priceValue*this.state.widthValue*this.state.lengthValue;
    pricePerRoll=this.round(pricePerRoll, 3);
    return pricePerRoll.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Price/M2';

    let textToShare='Input: \n'+ 'Price: '+this.state.priceValue+', Width: '+this.state.widthValue+', Length: '+this.state.lengthValue+' '
    +'\n'+'\n'
    +'Result: \n'
    + this.state.pricePerRoll +' Price/M2';

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

  validateDecimal = (value) => {
      var RE = /^\d*\.?\d{0,2}$/
      if(RE.test(value)){
         return true;
      }else{
         return false;
      }
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
          supText={true}
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
              title={i18n.t('calculation_price_m2.price').toUpperCase()}
              value={this.state.priceValue}
              onChangeText={(number) => {
                if(number){
                  if((number.split('\.').length-1)>1){
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                      return;
                  }
                }

                if(number>1000000){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

                if(number.includes(',')){
                   var exceptLast = number.toString();
                   exceptLast = exceptLast.replace(',', '');
                   number=exceptLast
                }

                if(this.getNewChar(number.toString())==='.'){
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.slice(0, -1);
                  if (exceptLast.toString().includes('.')) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    number=exceptLast
                  }
                }

                if(number>0){
                  if(!this.validateDecimal(number)) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    return;
                  }
               }

               if(number.toString().includes('-')) {
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.replace('-', '');
                  number=exceptLast
                  alert(i18n.t('converter_area.negativeAlert'));
                }


                this.setState({ priceValue: number },function(){this.updateAllValues()});
                }
              }
            />

            <View style={{ height: 33 }} />

            <DetailTextInput
              title={i18n.t('calculation_price_m2.length').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => {
                if(number){
                  if((number.split('\.').length-1)>1){
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                      return;
                  }
                }

                if(number>1000000){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

                if(number.includes(',')){
                   var exceptLast = number.toString();
                   exceptLast = exceptLast.replace(',', '');
                   number=exceptLast
                }

                if(this.getNewChar(number.toString())==='.'){
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.slice(0, -1);
                  if (exceptLast.toString().includes('.')) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    number=exceptLast
                  }
                }

                if(number>0){
                  if(!this.validateDecimal(number)) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    return;
                  }
               }

               if(number.toString().includes('-')) {
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.replace('-', '');
                  number=exceptLast
                  alert(i18n.t('converter_area.negativeAlert'));
                }

                this.setState({ lengthValue: number },function(){this.updateAllValues()});
                }
              }
            />

            <View style={{ height: 26 }} />

            <DetailTextInput
              title={i18n.t('calculation_price_m2.width').toUpperCase()}
              value={this.state.widthValue}
              onChangeText={(number) => {
                if(number){
                  if((number.split('\.').length-1)>1){
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                      return;
                  }
                }

                if(number>1000000){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

                if(number.includes(',')){
                   var exceptLast = number.toString();
                   exceptLast = exceptLast.replace(',', '');
                   number=exceptLast
                }

                if(this.getNewChar(number.toString())==='.'){
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.slice(0, -1);
                  if (exceptLast.toString().includes('.')) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    number=exceptLast
                  }
                }

                if(number>0){
                  if(!this.validateDecimal(number)) {
                    alert(i18n.t('converter_area.outOfRangeAlert'));
                    return;
                  }
               }

               if(number.toString().includes('-')) {
                  var exceptLast = number.toString();
                  exceptLast = exceptLast.replace('-', '');
                  number=exceptLast
                  alert(i18n.t('converter_area.negativeAlert'));
                }


                this.setState({ widthValue: number },function(){this.updateAllValues()});
                }
              }
            />

            <View style={{ height: 40 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('calculation_price_m2.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.pricePerRoll, 1)}
                  </MarqueeText>
              </View>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={{ height: 137.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>{applyLetterSpacing(i18n.t('calculation_price_m2.roll'), 1)}</Text>
            </View>

            <View style={{ height: 60.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>m</Text>
            </View>

            <View style={{ height: 53.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 15 }} />

            <View style={styles.resultUnitContainer}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                sup={'2'}
                text={applyLetterSpacing(i18n.t('calculation_price_m2.price_m2'), 1)}
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
        paddingTop: 6,
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
    top: 95,
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
    bottom: 91,
    left: 15,
    ...Platform.select({
      android: {
        bottom: 20,
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
