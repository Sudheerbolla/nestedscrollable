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
      unit: 'N/cm',
      lengthValue: '0',
      lengthValueInNM: '0',
      lengthValueInNCM: '0',
      lengthValueInN25MM: '0',
      lengthValueInKGMILS: '0',
      lengthValueInPIN: '0',
      lengthValueInOIN: '0',
      hideView:'N/cm'
    };
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

  validateDecimal = (value) => {
      var RE = /^\d*\.?\d{0,2}$/
      if(RE.test(value)){
         return true;
      }else{
         return false;
      }
  }

  updateAllValues = (number) => {
    if(number){
      if((number.split('\.').length-1)>1){
        alert(i18n.t('converter_area.outOfRangeAlert'));
          return;
      }
    }

    if(number>10000){
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
      lengthValueInNM: this.getCalculatedValue(number, 'N/m'),
      lengthValueInNCM: this.getCalculatedValue(number, 'N/cm'),
      lengthValueInN25MM: this.getCalculatedValue(number, 'N/25 mm'),
      lengthValueInKGMILS: this.getCalculatedValue(number, 'Kg/mils'),
      lengthValueInPIN: this.getCalculatedValue(number, 'Pounds/In'),
      lengthValueInOIN: this.getCalculatedValue(number, 'Ounces/In')
    });
  }

  getCalculatedValue = (number, conv) => {
    var outPut = '';
    if (this.state.unit == 'N/m') {
      if (conv === 'N/m') {
        outPut = number
      } else if (conv == 'N/cm') {
        outPut = 0.01 * number
      } else if (conv == 'N/25 mm') {
        outPut = 0.00004 * number
      } else if (conv == 'Kg/mils') {
        outPut = 2.590079180963938164e-6 * number
      } else if (conv == 'Pounds/In') {
        outPut = 8.85075 * number
      } else if (conv == 'Ounces/In') {
        outPut = 141.612 * number
      }
    } else if (this.state.unit == 'N/cm') {
      if (conv === 'N/m')
        outPut = 100 * number
      else if (conv == 'N/cm') {
        outPut = number
      } else if (conv == 'N/25 mm') {
        outPut = 0.004 * number
      } else if (conv == 'Kg/mils') {
        outPut = 0.00025900791809639378592 * number
      } else if (conv == 'Pounds/In') {
        outPut = 0.571015 * number
      } else if (conv == 'Ounces/In') {
        outPut = 1.4161193227806 * number
      }
    } else if (this.state.unit == 'N/25 mm') {
      if (conv === 'N/m')
        outPut = 40 * number
      else if (conv == 'N/cm') {
        outPut = 0.4 * number
      } else if (conv == 'N/25 mm') {
        outPut = number
      } else if (conv == 'Kg/mils') {
        outPut = 0.00010360316723855751979 * number
      } else if (conv == 'Pounds/In') {
        outPut = 0.228406 * number
      } else if (conv == 'Ounces/In') {
        outPut = 0.0056644772911224 * number
      }
    } else if (this.state.unit == 'Kg/mils')  {
      if (conv === 'N/m')
        outPut = 0.00024908891 * number
      else if (conv == 'N/cm') {
        outPut = 0.024908891 * number
      } else if (conv == 'N/25 mm') {
        outPut = 0.00980665 * number
      } else if (conv == 'Kg/mils') {
        outPut = number
      } else if (conv == 'Pounds/In') {
        outPut = 1.42233e-6 * number
      } else if (conv == 'Ounces/In') {
        outPut = 0.008786352733402 * number
      }
    } else if (this.state.unit == 'Pounds/In')  {
      if (conv === 'N/m')
        outPut = 175.127 * number
      else if (conv == 'N/cm') {
        outPut = 1.75127 * number
      } else if (conv == 'N/25 mm') {
        outPut = 0.00700508 * number
      } else if (conv == 'Kg/mils') {
        outPut = 0.000453592 * number
      } else if (conv == 'Pounds/In') {
        outPut = number
      } else if (conv == 'Ounces/In') {
        outPut = 16 * number
      }
    } else if (this.state.unit == 'Ounces/In')  {
      if (conv === 'N/m')
        outPut = 0.0070615518333333 * number
      else if (conv == 'N/cm') {
        outPut = 1.4161193227806 * number
      } else if (conv == 'N/25 mm') {
        outPut = 0.00566447729 * number
      } else if (conv == 'Kg/mils') {
        outPut = 2.83495e-5 * number
      } else if (conv == 'Pounds/In') {
        outPut = 0.0625 * number
      } else if (conv == 'Ounces/In') {
        outPut = number
      }
    }
    outPut = this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let textToShare='Input is '+this.state.lengthValue+' in '+this.state.unit+ ', And it is converted into following values : '
    +'\n Force in N/M '+this.state.lengthValueInNM
    +'\n Force in N/CM '+this.state.lengthValueInCM
    +'\n Force in N/25MM '+this.state.lengthValueInN25MM
    +'\n Force in KG/Mils '+this.state.lengthValueInKGMILS
    +'\n Force in Pounds/inch '+this.state.lengthValueInPIN
    +'\n Force in Ounce/inch '+this.state.lengthValueInOIN +'.';
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
              title={i18n.t('converter_force.force').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.updateAllValues(number)}
            />

            <View style={{ height: 83 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8, margin:5 }}>
                {applyLetterSpacing(i18n.t('converter_force.result').toUpperCase(), 5)}
              </Text>

              <View style={styles.resultNumber}>
              { this.state.hideView!='N/m' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInNM, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='N/cm' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInNCM, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='N/25 mm' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInN25MM, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Kg/mils' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInKGMILS, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Pounds/In' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPIN, 1)}
                </MarqueeText>
              }
              { this.state.hideView!='Ounces/In' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInOIN, 1)}
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
                    options={['N/m', 'N/cm', 'N/25 mm', 'Kg/mils', 'Pounds/In', 'Ounces/In']}
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
                    style={{ width: 260 }}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) =>{
                      this.setState({ unit: itemValue,hideView:itemValue });
                      this.updateAllValues(this.state.lengthValue)
                    }}>
                    <Picker.Item label="N/m" value="N/m" />
                    <Picker.Item label="N/cm" value="N/cm" />
                    <Picker.Item label="N/25	mm" value="N/25	mm" />
                    <Picker.Item label="Kg/mils" value="Kg/mils" />
                    <Picker.Item label="Pounds/In" value="Pounds/In" />
                    <Picker.Item label="Ounces/In" value="Ounces/In" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={{ height: Platform.select({ ios: 2, android: 20 }) }} />

            <View style={styles.resultUnitContainer}>
            { this.state.hideView!='N/m' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'N/m'}
              />
            }
            { this.state.hideView!='N/cm' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'N/cm'}
              />
            }
              { this.state.hideView!='N/25 mm' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'N/25mm'}
              />
            }
              { this.state.hideView!='Kg/mils' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Kg/mils'}
              />
            }
              { this.state.hideView!='Pounds/In' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Pounds/In'}
              />
            }
              { this.state.hideView!='Ounces/In' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Ounces/In'}
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
