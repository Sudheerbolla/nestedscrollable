'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import { StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  Dimensions,
  Platform,
  ImageBackground,
  ScrollView,
  Share
} from 'react-native';
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
      unit: 'Preis / m2',
      lengthValue: '0',
      lengthValueInPM: '0',
      lengthValueInPY: '0',
      lengthValueInPF: '0',
      lengthValueInPMSI: '0',
      hideView:'Preis / m2'
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
    if(number.includes(',')){
       var exceptLast = number.toString();
       exceptLast = exceptLast.replace(',', '');
       number=exceptLast
    }

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
      lengthValueInPM: this.getCalculatedValue(number, 'Preis / m2'),
      lengthValueInPY: this.getCalculatedValue(number, 'Preis / yd2'),
      lengthValueInPF: this.getCalculatedValue(number, 'Preis / ft2'),
      lengthValueInPMSI: this.getCalculatedValue(number, 'Preis / MSI'),
    });
  }

  getCalculatedValue = (number, conv) => {
    var outPut = '';
    if (this.state.unit == 'Preis / m2') {
      if (conv === 'Preis / m2')
        outPut = number
      else if (conv == 'Preis / yd2') {
        outPut = 0.836 * number
      } else if (conv == 'Preis / ft2') {
        outPut = 0.093 * number
      } else if (conv == 'Preis / MSI') {
        outPut = 0.645 * number
      }
    } else if (this.state.unit == 'Preis / yd2') {
      if (conv === 'Preis / m2')
        outPut = 1.20 * number
      else if (conv == 'Preis / yd2') {
        outPut = number
      } else if (conv == 'Preis / ft2') {
        outPut = 0.111 * number
      } else if (conv == 'Preis / MSI') {
        outPut = 0.77 * number
      }
    } else if (this.state.unit == 'Preis / ft2') {
      if (conv === 'Preis / m2')
        outPut = 10.764 * number
      else if (conv == 'Preis / yd2') {
        outPut = 9 * number
      } else if (conv == 'Preis / ft2') {
        outPut = number
      } else if (conv == 'Preis / MSI') {
        outPut = 6.94 * number
      }
    }  else if (this.state.unit == 'Preis / MSI')  {
      if (conv === 'Preis / m2')
        outPut = 1.550 * number
      else if (conv == 'Preis / yd2') {
        outPut = 1.296 * number
      } else if (conv == 'Preis / ft2') {
        outPut = 0.144 * number
      } else if (conv == 'Preis / MSI') {
        outPut = number
      }
    }
    outPut = this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Price';

    let textToShare='Input: '+this.state.lengthValue+' '+this.state.unit
    +'\n'+'\n'
    +'Result: \n'
    + this.state.lengthValueInPM +' m2'
    +'\n'+this.state.lengthValueInPY+' yard2'
    +'\n'+this.state.lengthValueInPF+' feet2'
    +'\n'+this.state.lengthValueInPMSI+' MSI';
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
              title={i18n.t('converter_price.price').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.updateAllValues(number)}
            />

            <View style={{ height: 83 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('converter_price.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                { this.state.hideView!='Preis / m2' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPM, 1)}
                </MarqueeText>
                }
                { this.state.hideView!='Preis / yd2' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPY, 1)}
                </MarqueeText>
                }
                { this.state.hideView!='Preis / ft2' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPF, 1)}
                </MarqueeText>
                }
                { this.state.hideView!='Preis / MSI' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInPMSI, 1)}
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
                    options={['Preis / m2', 'Preis / yd2', 'Preis / ft2', 'Preis / MSI']}
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
                    <Picker.Item label="Preis / m2" value="Preis / m2" />
                    <Picker.Item label="Preis / yd2" value="Preis / yd2" />
                    <Picker.Item label="Preis / ft2" value="Preis / ft2" />
                    <Picker.Item label="Preis / MSI" value="Preis / MSI" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={{ height: Platform.select({ ios: 2, android: 20 }) }} />

            <View style={styles.resultUnitContainer}>
              { this.state.hideView!='Preis / m2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Preis/m'}
                sup={'2'}
              />
              }
              { this.state.hideView!='Preis / yd2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Preis/yd'}
                sup={'2'}
              />
              }
              { this.state.hideView!='Preis / ft2' &&
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'Preis/ft'}
                  sup={'2'}
                />
              }
              { this.state.hideView!='Preis / MSI' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'Preis/MSI'}
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
