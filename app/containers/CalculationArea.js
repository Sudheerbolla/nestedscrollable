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
  TouchableOpacity,
  NativeModules,
  Share
} from 'react-native';

import { Grid, DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';
import Communications from 'react-native-communications';

const { width, height } = Dimensions.get('window');

export default class CalculationArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'm',
      lengthValue: '66.00',
      widthValue: '0.019',
      areaValueInM: '10',
      areaValueInY: '10',
      areaValueInF: '10',
      areaValueInI: '10',
    };
  }

  componentDidMount(){
    this.updateAllValues();
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

  getNewChar(str){
    return str[str.length - 1];
  }

  validateDecimal2 = (value) => {
      var RE = /^\d*\.?\d{0,2}$/
      if(RE.test(value)){
         return true;
      } else{
         return false;
      }
  }

  validateDecimal3 = (value) => {
      var RE = /^\d*\.?\d{0,3}$/
      if(RE.test(value)){
         return true;
      } else{
         return false;
      }
  }

  updateAllValues = () => {
    this.setState({
      areaValueInM:this.getCalculatedValue('m'),
      areaValueInY:this.getCalculatedValue('yards'),
      areaValueInF:this.getCalculatedValue('feet'),
      areaValueInI:this.getCalculatedValue('inches')
    });
  }

  getCalculatedValue = (conv) => {
    var outPut = '';
    if (this.state.unit == 'm') {
      var areaInM=this.state.lengthValue * this.state.widthValue;
      if (conv == 'm')
        outPut = areaInM
      else if (conv == 'yards') {
        outPut = 1.19599 * areaInM
      } else if (conv == 'feet') {
        outPut = 10.7639100001464 * areaInM
      } else if (conv == 'inches') {
        outPut = 1550.0030400210816879 * areaInM
      }
    } else if (this.state.unit == 'yards') {
      var areaInY=this.state.lengthValue * this.state.widthValue;
      if (conv == 'm')
        outPut = 0.836127 * areaInY
      else if (conv == 'yards') {
        outPut = areaInY
      } else if (conv == 'feet') {
        outPut = 8.999996124959999122 * areaInY
      } else if (conv == 'inches') {
        outPut = 1295.9994419942399873 * areaInY
      }
    } else if (this.state.unit == 'feet') {
      var areaInF=this.state.lengthValue * this.state.widthValue;
      if (conv == 'm')
        outPut = 0.092902999999667099096 * areaInF
      else if (conv == 'yards') {
        outPut = 0.11111106327111111569 * areaInF
      } else if (conv == 'feet') {
        outPut = areaInF
      } else if (conv == 'inches') {
        outPut = 143.99993799936001437 * areaInF
      }
    } else if (this.state.unit == 'inches') {
      var areaInI=this.state.lengthValue * this.state.widthValue;
      if (conv == 'm')
        outPut = 0.0006451597222199103622*areaInI
      else if (conv == 'yards') {
        outPut = 0.00077160460604938272376 * areaInI
      } else if (conv == 'feet') {
        outPut = 0.0069444414544444438633 * areaInI
      } else if (conv == 'inches') {
        outPut = areaInI
      }
    }
    outPut=this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let emailsubject='Tesa Tape Calculator - Area';

    let textToShare='Input: \n'+ 'Length: '+this.state.lengthValue+', Width: '+this.state.widthValue+' '
    +'\n'+'\n'
    +'Result: \n'
    + this.state.areaValueInM +' m2'
    +'\n'+this.state.areaValueInY+' yard2'
    +'\n'+this.state.areaValueInF+' feet2'
    +'\n'+this.state.areaValueInI+' inches2';

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

  render() {
    const { params } = this.props.navigation.state;
    const space = Platform.select({ ios: 5, android: 2 });
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
                title={i18n.t('calculation_area.length').toUpperCase()}
                value={this.state.lengthValue.toString()}
                setNativeProps={this.state.lengthValue}
                onChangeText={(number) => {
                  if(number){
                    if((number.split('\.').length-1)>1){
                      alert(i18n.t('converter_area.outOfRangeAlert'));
                      return;
                    }
                    if(number>10000000){
                      alert(i18n.t('converter_area.outOfRangeAlert'));
                      return;
                    }
                    if(number.includes(',')){
                       var exceptLast = number.toString();
                       exceptLast = exceptLast.replace(',', '');
                       number =exceptLast
                    }
                    if(number>0){
                      if(!this.validateDecimal2(number)) {
                        alert(i18n.t('converter_area.outOfRangeAlert'));
                        return;
                      }
                    }
                    if(this.getNewChar(number.toString())==='.'){
                      var exceptLast = number.toString();
                      exceptLast = exceptLast.slice(0, -1);
                      if (exceptLast.toString().includes('.')) {
                        alert('A Number cannot have two decimals points');
                        number =exceptLast
                      }
                    }

                   if(number.toString().includes('-')) {
                      var exceptLast = number.toString();
                      exceptLast = exceptLast.replace('-', '');
                      number =exceptLast
                      alert(i18n.t('converter_area.negativeAlert'));
                    }

                  }
                  this.setState({ lengthValue: number },function(){this.updateAllValues()});
                  }
                }
              />

              <View style={{ height: 33 }} />

              <DetailTextInput
                title={i18n.t('calculation_area.width').toUpperCase()}
                value={this.state.widthValue}
                onChangeText={(number) => {
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
                  if(this.getNewChar(number.toString())==='.'){
                    var exceptLast = number.toString();
                    exceptLast = exceptLast.slice(0, -1);
                    if (exceptLast.toString().includes('.')) {
                      alert('A Number cannot have two decimals points');
                      number=exceptLast
                    }
                  }
                  if(number>0){
                    if(!this.validateDecimal3(number)) {
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

              <View style={{ height: 60 }} />

              <View style={styles.resultContainer}>
                <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8, color: COLORS.DARK_GREY, margin:5 }}>
                  {applyLetterSpacing(i18n.t('calculation_area.result').toUpperCase(), space)}
                </Text>
                <View style={styles.resultNumber}>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.areaValueInM==="NaN"?0:this.state.areaValueInM, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.areaValueInY==="NaN"?0:this.state.areaValueInY, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.areaValueInF==="NaN"?0:this.state.areaValueInF, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.areaValueInI==="NaN"?0:this.state.areaValueInI, 1)}
                  </MarqueeText>
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
                      options={['yards', 'm', 'feet', 'inches']}
                      fieldTemplate={this.renderField}
                      style={{ paddingLeft: 30, marginTop: 10, height: 20 }}
                      value={this.state.unit}
                      onValueChange={(value) => {
                        this.setState({ unit: value },function(){this.updateAllValues()});
                      }}
                    />
                  ),
                  ios: (
                    <Picker
                      selectedValue={this.state.unit}
                      itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                      style={{
                        paddingLeft: Platform.select({ ios: 10 }),
                        marginLeft: Platform.select({ android: 20 }),
                      }}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({ unit: itemValue },function(){this.updateAllValues()});
                      }}>
                      <Picker.Item label="yards" value="yards" />
                      <Picker.Item label="m" value="m" />
                      <Picker.Item label="feet" value="feet" />
                      <Picker.Item label="inches" value="inches" />
                    </Picker>
                  ),
                })}

                <View style={styles.pickerBottomBorder} />
              </View>

              <View style={{ height: Platform.select({ android: 83 }) }} />

              <View style={styles.unitWidth}>
                <Text style={styles.unitWidthLabel}>{this.state.unit}</Text>
              </View>

              <View style={{ height: Platform.select({ ios: 38, android: 0 }) }} />

              <View style={styles.resultUnitContainer}>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'m'}
                  sup={'2'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'yards'}
                  sup={'2'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'feet'}
                  sup={'2'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'inches'}
                  sup={'2'}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ height: Platform.select({ ios: 35, android: 10 }) }} />
      </Grid>
    );
  }

}

const styles = StyleSheet.create({
  resultUnitContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: 55,
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
    top: Platform.select({ ios: -25, android: -10 }),
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
// {Platform.select({
//   android: (
//     <CustomPicker
//       options={['yards', 'm', 'feet', 'inches']}
//       fieldTemplate={this.renderField}
//       style={{ paddingLeft: 30, marginTop: 10, height: 20 }}
//       value={this.state.unit}
//       onValueChange={(value) => {
//         this.setState({ unit: value },function(){this.updateAllValues()});
//       }}
//     />
//   ),
//   ios: (
//     <Picker
//       selectedValue={this.state.unit}
//       itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
//       style={{
//         paddingLeft: Platform.select({ ios: 10 }),
//         marginLeft: Platform.select({ android: 20 }),
//       }}
//       onValueChange={(itemValue, itemIndex) => {
//         this.setState({ unit: itemValue },function(){this.updateAllValues()});
//       }}>
//       <Picker.Item label="yards" value="yards" />
//       <Picker.Item label="m" value="m" />
//       <Picker.Item label="feet" value="feet" />
//       <Picker.Item label="inches" value="inches" />
//     </Picker>
//   ),
// })}
