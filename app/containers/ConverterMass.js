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

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'KG',
      lengthValue: '0',
      lengthValueInKG: '0',
      lengthValueInPound: '0',
      lengthValueInOunce: '0',
      lengthValueInNewton: '0',
      hideView:'KG'
    };
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

  validateDecimal = (value) => {
      var RE = /^\d*\.?\d{0,2}$/
      if(RE.test(value)){
         return true;
      }else{
         return false;
      }
  }

  round(number, precision) {
    var shift = function(number, precision, reverseShift) {
      if (reverseShift) {
        precision = -precision;
      }
      var numArray = ("" + number).split("e");
      return + (numArray[0] + "e" + (
        numArray[1]
        ? (+ numArray[1] + precision)
        : precision));
    };
    return shift(Math.round(shift(number, precision, false)), precision, true);
  }

  getNewChar(str) {
    return str[str.length - 1];
  }

  updateAllValues = (number) => {
    if(number){
      if((number.split('\.').length-1)>1){
        alert(i18n.t('converter_area.outOfRangeAlert'));
          return;
      }
    }

    if(number>100000){
      alert(i18n.t('converter_area.outOfRangeAlert'));
      return;
    }

    // if(number===''){
    //   alert(i18n.t('converter_area.noValueAlert'));
    // }

    if (this.getNewChar(number.toString()) === '.') {
      var exceptLast = number.toString();
      exceptLast = exceptLast.slice(0, -1);
      if (exceptLast.toString().includes('.')) {
        alert('A Number cannot have two decimals points');
        number = exceptLast
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

    this.setState({
      lengthValue: number,
      lengthValueInKG: this.getCalculatedValue(number, 'KG'),
      lengthValueInPound: this.getCalculatedValue(number, 'Poundes'),
      lengthValueInOunce: this.getCalculatedValue(number, 'Ounces'),
      lengthValueInNewton: this.getCalculatedValue(number, 'Newton'),
    });
  }

  getCalculatedValue = (number, conv) => {
    var outPut = '';
    if (this.state.unit == 'KG') {
      if (conv === 'KG')
        outPut = number
      else if (conv == 'Poundes') {
        outPut = 2.20462 * number
      } else if (conv == 'Ounces') {
        outPut = 35.274 * number
      } else if (conv == 'Newton') {
        outPut = 9.81 * number
      }
    } else if (this.state.unit == 'Poundes') {
      if (conv === 'KG')
        outPut = 0.453592 * number
      else if (conv == 'Poundes') {
        outPut = number
      } else if (conv == 'Ounces') {
        outPut = 16 * number
      } else if (conv == 'Newton') {
        outPut = 4.44822 * number
      }
    } else if (this.state.unit == 'Ounces') {
      if (conv === 'KG')
        outPut = 0.0283495 * number
      else if (conv == 'Poundes') {
        outPut = 0.0625 * number
      } else if (conv == 'Ounces') {
        outPut = number
      } else if (conv == 'Newton') {
        outPut = 3.596943079091 * number
      }
    }  else if (this.state.unit == 'Newton')  {
      if (conv === 'KG')
        outPut = 0.102 * number
      else if (conv == 'Poundes') {
        outPut = 0.224809 * number
      } else if (conv == 'Ounces') {
        outPut = 3.60 * number
      } else if (conv == 'Newton') {
        outPut = number
      }
    }
    outPut = this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let textToShare='Input is '+this.state.lengthValue+' in '+this.state.unit+ ', And it is converted into following values : '
    +'\n Mass in KG '+this.state.lengthValueInKG
    +'\n Mass in Pound '+this.state.lengthValueInPound
    +'\n Mass in Ounce '+this.state.lengthValueInOunce
    +'\n Mass in Newton '+this.state.lengthValueInNewton+'.';
      Share.share({
        message: textToShare,
        title: 'Please Share using',
        url: textToShare,
        subject: textToShare
      }, {
        dialogTitle: 'Please Share using',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter',
        ],
        tintColor: 'green'
      })
      .then(this._showResult)
      .catch(err => console.log(err))
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
              title={i18n.t('converter_mass.mass').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.updateAllValues(number)}
            />

            <View style={{ height: 83 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8, margin:5 }}>
                {applyLetterSpacing(i18n.t('converter_mass.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
              { this.state.hideView!='KG' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInKG, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Poundes' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPound, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Ounces' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInOunce, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Newton' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInNewton, 1)}
                </MarqueeText>
              }
              </View>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={{ height: 24 }} />

            <View style={styles.unitContainer}>
              <View style={styles.pickerTopBorder} />

              {Platform.select({
                android: (
                  <CustomPicker
                    options={['KG', 'Poundes', 'Ounces', 'Newton']}
                    fieldTemplate={this.renderField}
                    style={{ paddingLeft: 30, marginTop: 13, height: 20 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                        this.setState({ unit: value,hideView:value });
                        this.updateAllValues(this.state.lengthValue)
                    }}
                  />
                ),
                ios: (
                  <Picker
                    selectedValue={this.state.unit}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) =>{
                      this.setState({ unit: itemValue,hideView:itemValue });
                      this.updateAllValues(this.state.lengthValue)
                    }}>
                    <Picker.Item label="KG" value="KG" />
                    <Picker.Item label="Poundes" value="Poundes" />
                    <Picker.Item label="Ounces" value="Ounces" />
                    <Picker.Item label="Newton" value="Newton" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={{ height: Platform.select({ ios: 2, android: 20 }) }} />

            <View style={styles.resultUnitContainer}>
              { this.state.hideView!='KG' &&
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'KG'}
                />
              }
              { this.state.hideView!='Poundes' &&
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'Poundes'}
                />
              }
              { this.state.hideView!='Ounces' &&
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'Ounces'}
                />
              }
              { this.state.hideView!='Newton' &&
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'Newton'}
                />
              }

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
        paddingTop: 80,
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
    marginLeft:10
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
        paddingTop: 85,
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
        top: 95,
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
