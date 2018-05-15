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

export default class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'm2',
      lengthValue: '0',
      lengthValueInM: '0',
      lengthValueInCM: '0',
      lengthValueInY: '0',
      lengthValueInF: '0',
      lengthValueInI: '0',
      lengthValueInMSI: '0',
      hideView:'m2'
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
                // sup={'2'}
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

  getNewChar(str){
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

    if(number>100000000){
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

    var lastChar = this.getNewChar(number.toString());

    if(lastChar==='.') {
      var exceptLast = number.toString();
      exceptLast = exceptLast.slice(0, -1);
      if (exceptLast.toString().includes('.')) {
        // alert('A Number cannot have two decimals points');
        number=exceptLast
        alert(i18n.t('converter_area.outOfRangeAlert'));
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
      lengthValueInM:this.getCalculatedValue(number,'m2'),
      lengthValueInCM:this.getCalculatedValue(number,'cm2'),
      lengthValueInY:this.getCalculatedValue(number,'yard2'),
      lengthValueInF:this.getCalculatedValue(number,'feet2'),
      lengthValueInI:this.getCalculatedValue(number,'inches2'),
      lengthValueInMSI: (this.getCalculatedValue(number,'inches2') / 1000).toString(),
    });
  }

  getCalculatedValue = (number, conv) => {
    var outPut = '';
    if (this.state.unit == 'm2') {
      if (conv === 'm2')
        outPut = number
      else if (conv == 'cm2') {
        outPut = 10000 * number
      } else if (conv == 'yard2') {
        outPut = 1.19599 * number
      } else if (conv == 'feet2') {
        outPut = 10.7639100001464 * number
      } else if (conv == 'inches2') {
        outPut = 1550.0030400210816879 * number
      }
    } else if (this.state.unit == 'cm2') {
      if (conv === 'm2')
        outPut = 0.0001 * number
      else if (conv == 'cm2') {
        outPut = number
      } else if (conv == 'yard2') {
        outPut = 0.000119599 * number
      } else if (conv == 'feet2') {
        outPut = 0.00107639100000000011 * number
      } else if (conv == 'inches2') {
        outPut = 0.15500030400000003317 * number
      }
    } else if (this.state.unit == 'yard2') {
      if (conv === 'm2')
        outPut = 0.836127 * number
      else if (conv == 'cm2') {
        outPut = 8361.269999970038 * number
      } else if (conv == 'yard2') {
        outPut = number
      } else if (conv == 'feet2') {
        outPut = 8.999996124959999122 * number
      } else if (conv == 'inches2') {
        outPut = 1295.9994419942399873 * number
      }
      // alert(this.state.unit+'\n'+conv+' '+outPut+' \n'+this.state.hideView)
    } else if (this.state.unit == 'feet2') {
      if (conv === 'm2')
        outPut = 0.092902999999667099096 * number
      else if (conv == 'cm2') {
        outPut = 929.02999999667099473 * number
      } else if (conv == 'yard2') {
        outPut = 0.11111106327111111569 * number
      } else if (conv == 'feet2') {
        outPut = number
      } else if (conv == 'inches2') {
        outPut = 143.99993799936001437 * number
      }
    } else if (this.state.unit == 'inches2') {
      if (conv === 'm2')
        outPut = 0.0006451597222199103622*number
      else if (conv == 'cm2') {
        outPut = 6.4515972221991031432 * number
      } else if (conv == 'yard2') {
        outPut = 0.00077160460604938272376 * number
      } else if (conv == 'feet2') {
        outPut = 0.0069444414544444438633 * number
      } else if (conv == 'inches2') {
        outPut = number
      }
    }else if (this.state.unit == 'MSI') {
      var outPutInInches = 1000*number
      if (conv === 'm2')
        outPut = 0.0006451597222199103622*outPutInInches
      else if (conv == 'cm2') {
        outPut = 6.4515972221991031432 * outPutInInches
      } else if (conv == 'yard2') {
        outPut = 0.00077160460604938272376 * outPutInInches
      } else if (conv == 'feet2') {
        outPut = 0.0069444414544444438633 * outPutInInches
      } else if (conv == 'inches2') {
        outPut = outPutInInches
      }
    }
    outPut=this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Area';

    let textToShare='Input: '+this.state.lengthValue+' '+this.state.unit
    +'\n'+'\n'
    +'Result: \n'
    + this.state.lengthValueInM +' m2'
    +'\n'+this.state.lengthValueInCM+' cm2'
    +'\n'+this.state.lengthValueInY+' yard2'
    +'\n'+this.state.lengthValueInF+' feet2'
    +'\n'+this.state.lengthValueInI+' inches2'
    +'\n'+this.state.lengthValueInMSI +' MSI';
<<<<<<< HEAD
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
=======
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
>>>>>>> e30fcea7e212198209aa2330f3215ea13778c389
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
              title={i18n.t('converter_area.area').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.updateAllValues(number)}
             />

            <View style={{ height: 83 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8, margin:5 }}>
                {applyLetterSpacing(i18n.t('converter_area.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                { this.state.hideView!='m2' &&
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.lengthValueInM, 1)}
                </MarqueeText>
                }
                { this.state.hideView!='cm2' &&
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInCM, 1)}
                  </MarqueeText>
                }
                { this.state.hideView!='yard2' &&
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInY, 1)}
                  </MarqueeText>
                }
                { this.state.hideView!='feet2' &&
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInF, 1)}
                  </MarqueeText>
                }
                { this.state.hideView!='inches2' &&
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInI, 1)}
                  </MarqueeText>
                }
                { this.state.hideView!='MSI' &&
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInMSI, 1)}
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
                    options={['m2', 'cm2', 'yard2', 'feet2', 'inches2', 'MSI']}
                    fieldTemplate={this.renderField}
                    style={{ paddingLeft: 30, marginTop: 13, height: 20 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                      this.setState({ unit: value,hideView:value },function(){this.updateAllValues(this.state.lengthValue)});
                    }}
                  />
                ),
                ios: (
                  <Picker
                    selectedValue={this.state.unit}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ unit: itemValue, hideView:itemValue},function(){this.updateAllValues(this.state.lengthValue)});
                    }}>
                    <Picker.Item label="m2" value="m2" />
                    <Picker.Item label="cm2" value="cm2" />
                    <Picker.Item label="yard2" value="yard2" />
                    <Picker.Item label="feet2" value="feet2" />
                    <Picker.Item label="inches2" value="inches2" />
                    <Picker.Item label="MSI" value="MSI" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />

            </View>

            <View style={{ height: Platform.select({ ios: 2, android: 20 }) }} />

            <View style={styles.resultUnitContainer}>
              { this.state.hideView!='m2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'m'}
                sup={'2'}
              />
              }
              { this.state.hideView!='cm2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'cm'}
                sup={'2'}
              />}
              { this.state.hideView!='yard2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'yards'}
                sup={'2'}
              />}
              { this.state.hideView!='feet2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'feet'}
                sup={'2'}
              />}
             { this.state.hideView!='inches2' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'inches'}
                sup={'2'}
              />}
              { this.state.hideView!='MSI' &&
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'MSI'}
              />}
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
        bottom: -5,
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
