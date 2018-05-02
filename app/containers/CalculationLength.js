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
      unit: 'm',
      areaValue: '240',
      widthValue: '10',
      lengthValueInM:'0',
      lengthValueInY:'0',
      lengthValueInI:'0',
      lengthValueInF:'0',
    };
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
                sup={'2'}
              />
            </View>
          )}
        </View>
      </View>
    );
  }

  updateAllValues = () => {
    this.setState({
      lengthValueInM:this.getCalculatedValue('m'),
      lengthValueInY:this.getCalculatedValue('yards'),
      lengthValueInF:this.getCalculatedValue('feet'),
      lengthValueInI:this.getCalculatedValue('inches')
    });
  }

  getCalculatedValue = (conv) => {
    var outPut = '';
    if (this.state.unit == 'm') {
      var lengthInM=this.state.areaValue / this.state.widthValue;
      if (conv == 'm')
        outPut = lengthInM
      else if (conv == 'yards') {
        outPut = 1.09361 * lengthInM
      } else if (conv == 'feet') {
        outPut = 3.28084 * lengthInM
      } else if (conv == 'inches') {
        outPut = 39.3701 * lengthInM
      }
    } else if (this.state.unit == 'yards') {
      var lengthInY=this.state.areaValue / this.state.widthValue;
      if (conv == 'm')
        outPut = 0.9144 * lengthInY
      else if (conv == 'yards') {
        outPut = lengthInY
      } else if (conv == 'feet') {
        outPut = 3 * lengthInY
      } else if (conv == 'inches') {
        outPut = 36 * lengthInY
      }
    } else if (this.state.unit == 'feet') {
      var lengthInF=this.state.areaValue / this.state.widthValue;
      if (conv == 'm')
        outPut = 0.3048 * lengthInF
      else if (conv == 'yards') {
        outPut = 0.333333 * lengthInF
      } else if (conv == 'feet') {
        outPut = lengthInF
      } else if (conv == 'inches') {
        outPut = 12 * lengthInF
      }
    } else if (this.state.unit == 'inches') {
      var lengthInI=this.state.areaValue / this.state.widthValue;
      if (conv == 'm')
        outPut = 0.0254*lengthInI
      else if (conv == 'yards') {
        outPut = 0.0277778 * lengthInI
      } else if (conv == 'feet') {
        outPut = 0.0833333 * lengthInI
      } else if (conv == 'inches') {
        outPut = lengthInI
      }
    }
    outPut=this.round(outPut, 3);
    return outPut.toString();
  }

  shareTextWithTitle() {
    let textToShare='Area is '+this.state.areaValue+' Width is '+this.state.widthValue+' in '+this.state.unit+ ', and Length is calculated into following values : '
    +'\n Length in Meters '+this.state.lengthValueInM
    +'\n Length in Yards '+this.state.lengthValueInY
    +'\n Length in Feet '+this.state.lengthValueInF
    +'\n Length in Inches '+this.state.lengthValueInI +'.';
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
        <ScrollView scrollEnabled={Platform.select({ ios: false, android: true })}>
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <View style={styles.clearSpace} />

              <DetailTextInput
                title={i18n.t('calculation_length.area').toUpperCase()}
                value={this.state.areaValue}
                onChangeText={(number) => {
                  if(this.getNewChar(number.toString())==='.'){
                    var exceptLast = number.toString();
                    exceptLast = exceptLast.slice(0, -1);
                    if (exceptLast.toString().includes('.')) {
                      alert('A Number cannot have two decimals points');
                      number=exceptLast
                    }
                  }
                  this.setState({ areaValue: number },function(){this.updateAllValues()});
                  }
                }
              />

              <View style={{ height: 33 }} />

              <DetailTextInput
                title={i18n.t('calculation_length.width').toUpperCase()}
                value={this.state.widthValue}
                onChangeText={(number) => {
                  if(this.getNewChar(number.toString())==='.'){
                    var exceptLast = number.toString();
                    exceptLast = exceptLast.slice(0, -1);
                    if (exceptLast.toString().includes('.')) {
                      alert('A Number cannot have two decimals points');
                      number=exceptLast
                    }
                  }
                  this.setState({ widthValue: number },function(){this.updateAllValues()});
                  }
                }
              />

              <View style={{ height: 60 }} />

              <View style={styles.resultContainer}>
                <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8, margin:5 }}>
                  {applyLetterSpacing(
                    i18n.t('calculation_length.result').toUpperCase(),
                    Platform.select({ ios: 5, android: 2 })
                  )}
                </Text>
                <View style={styles.resultNumber}>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInM, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInY, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInF, 1)}
                  </MarqueeText>
                  <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                           {applyLetterSpacing(this.state.lengthValueInI, 1)}
                  </MarqueeText>
                </View>
              </View>
            </View>

            <View style={styles.rightContainer}>
              <View style={{ height: Platform.select({ ios: 24, android: 0 }) }} />

              <View style={styles.unitContainer}>
                <View style={styles.pickerTopBorder} />

                {Platform.select({
                  android: (
                    <CustomPicker
                      options={['yards', 'm', 'feet', 'inches']}
                      fieldTemplate={this.renderField}
                      style={{ paddingLeft: 30, marginTop: 15, height: 20 }}
                      value={this.state.unit}
                      onValueChange={(value) => {
                        this.setState({ unit: value },function(){this.updateAllValues()});
                      }}
                    />
                  ),
                  ios: (
                    <Picker
                      style={{ marginLeft: Platform.select({ android: 10 }) }}
                      selectedValue={this.state.unit}
                      itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                      onValueChange={(itemValue, itemIndex) => {
                        this.setState({ unit: itemValue },function(){this.updateAllValues()});
                      }}>
                      <Picker.Item label="yards2" value="yards2" />
                      <Picker.Item label="m2" value="m2" />
                      <Picker.Item label="feet2" value="feet2" />
                      <Picker.Item label="inches2" value="inches2" />
                    </Picker>
                  ),
                })}

                <View style={styles.pickerBottomBorder} />
              </View>

              <View style={{ height: Platform.select({ android: 75 }) }} />

              <View style={styles.unitWidth}>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={this.state.unit}
                />
              </View>

              <View style={{ height: Platform.select({ ios: 38, android: 0 }) }} />

              <View style={styles.resultUnitContainer}>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'m'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'yards'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'feet'}
                />
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'inches'}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={{ height: 35 }} />
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  resultUnitContainer: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: 62,
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
        paddingTop: 108,
      },
    }),
  },
  unitWidth: {
    height: 42,
    top: Platform.select({ ios: -25, android: 0 }),
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
        top: 117,
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
        bottom: -8,
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
