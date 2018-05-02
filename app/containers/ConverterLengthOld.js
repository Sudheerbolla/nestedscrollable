'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground } from 'react-native';
import { Grid, DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetail from '../modules/NavBarDetail';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';

const { width, height } = Dimensions.get('window');

// 1m = 100cm, 1000mm, 1.09361yard, 3.28083foot, 39.36996inches, 1msi
// 1cm = 0.01m, 10mm, 0.0109361yard, 0.0328083foot, 0.3936996inches, 1msi
// 1mm = 0.001m, 0.1cm, 0.00109361yard, 0.00328083foot, 0.03936996inches, 1msi
// 1yard = 0.9144m, 91.44cm, 914.4mm, 3foot, 36inches, 1msi
// 1foot = 0.3048m, 30.48cm, 304.8mm, 0.333333yard, 12inches, 1msi
// 1inch = 0.0254m, 2.54cm, 25.4mm, 0.0277778yard, 0.0833334foot, 1msi

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: 'mm',
      lengthValue: '10',
      lengthValueInM: '10',
      lengthValueInCM: '10',
      lengthValueInMM: '10',
      lengthValueInY: '10',
      lengthValueInF: '10',
      lengthValueInI: '10',
      lengthValueInMSI: '10',
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

  updateAllValues = (number) => {

    if (this.getNewChar(number.toString()) === '.') {
      var exceptLast = number.toString();
      exceptLast = exceptLast.slice(0, -1);
      if (exceptLast.toString().includes('.')) {
        alert('A Number cannot have two decimals points');
        number = exceptLast
      }
    }

    this.setState({
      lengthValue: number,
      lengthValueInM: this.getCalculatedValue(number, 'm'),
      lengthValueInCM: this.getCalculatedValue(number, 'cm'),
      lengthValueInMM: this.getCalculatedValue(number, 'mm'),
      lengthValueInY: this.getCalculatedValue(number, 'yard'),
      lengthValueInF: this.getCalculatedValue(number, 'feet'),
      lengthValueInI: this.getCalculatedValue(number, 'inches'),
      lengthValueInMSI: this.getCalculatedValue(number, 'MSI')
    });
  }

  getCalculatedValue = (number, conv) => {
    var outPut = '';
    if (this.state.unit == 'm') {
      if (conv === 'm')
        outPut = number
      else if (conv == 'cm') {
        outPut = 100 * number
      } else if (conv == 'mm') {
        outPut = 1000 * number
      } else if (conv == 'yard') {
        outPut = 1.09361 * number
      } else if (conv == 'feet') {
        outPut = 3.28083 * number
      } else if (conv == 'inches') {
        outPut = 39.36996 * number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'cm') {
      if (conv === 'm')
        outPut = 0.01 * number
      else if (conv == 'cm') {
        outPut = number
      } else if (conv == 'mm') {
        outPut = 10 * number
      } else if (conv == 'yard') {
        outPut = 0.0109361 * number
      } else if (conv == 'feet') {
        outPut = 0.0328083 * number
      } else if (conv == 'inches') {
        outPut = 0.3936996 * number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'mm') {
      if (conv === 'm')
        outPut = 0.001 * number
      else if (conv == 'cm') {
        outPut = 0.1 * number
      } else if (conv == 'mm') {
        outPut = number
      } else if (conv == 'yard') {
        outPut = 0.00109361 * number
      } else if (conv == 'feet') {
        outPut = 0.00328083 * number
      } else if (conv == 'inches') {
        outPut = 0.03936996 * number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'yard') {
      if (conv === 'm')
        outPut = 0.9144 * number
      else if (conv == 'cm') {
        outPut = 91.44 * number
      } else if (conv == 'mm') {
        outPut = 914.4 * number
      } else if (conv == 'yard') {
        outPut = number
      } else if (conv == 'feet') {
        outPut = 3 * number
      } else if (conv == 'inches') {
        outPut = 36 * number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'feet') {
      if (conv === 'm')
        outPut = 0.3048 * number
      else if (conv == 'cm') {
        outPut = 30.48 * number
      } else if (conv == 'mm') {
        outPut = 304.8 * number
      } else if (conv == 'yard') {
        outPut = 0.333333 * number
      } else if (conv == 'feet') {
        outPut = number
      } else if (conv == 'inches') {
        outPut = 12 * number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'inches') {
      if (conv === 'm')
        outPut = 0.0254 * number
      else if (conv == 'cm') {
        outPut = 2.54 * number
      } else if (conv == 'mm') {
        outPut = 25.4 * number
      } else if (conv == 'yard') {
        outPut = 0.0277778 * number
      } else if (conv == 'feet') {
        outPut = 0.0833334 * number
      } else if (conv == 'inches') {
        outPut = number
      } else if (conv == 'MSI') {
        outPut = number
      }
    } else if (this.state.unit == 'MSI') {
      outPut = number
    }
    outPut = this.round(outPut, 3);
    return outPut.toString();
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
            alert('on Shared');
          }}
        />
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.clearSpace} />

            <DetailTextInput
              title={i18n.t('converter_length.length').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.updateAllValues(number)}
            />

            <View style={{ height: 83 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('converter_area.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                  <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInM, 1)}</Text>
                  <SupText
                    textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                    supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                    style={styles.unitItem}
                    text={'m'}
                  />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInCM, 1)}</Text>
                  <SupText
                    textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                    supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                    style={styles.unitItem}
                    text={'cm'}
                  />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInMM, 1)}</Text>
                  <SupText
                    textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                    supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                    style={styles.unitItem}
                    text={'mm'}
                  />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInY, 1)}</Text>
                  <SupText
                    textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                    supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                    style={styles.unitItem}
                    text={'yards'}
                  />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInF, 1)}</Text>
                  <SupText
                    textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                    supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                    style={styles.unitItem}
                    text={'feet'}
                  />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInI, 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'inches'}
                />
                </View>
                <View style={{flexDirection:'row',  flex: 1,padding:5}}>
                <Text style={styles.number}>{applyLetterSpacing(this.state.lengthValueInMSI, 1)}</Text>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'MSI'}
                />
                </View>

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
                    options={['m', 'cm', 'mm', 'yard', 'feet', 'inches', 'MSI']}
                    fieldTemplate={this.renderField}
                    style={{ paddingLeft: 30, marginTop: 13, height: 20 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                        this.setState({ unit: value });
                        this.updateAllValues(this.state.lengthValue)
                    }}
                  />
                ),
                ios: (
                  <Picker
                    selectedValue={this.state.unit}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) =>{
                      this.setState({ unit: itemValue });
                      this.updateAllValues(number)
                    }}>
                    <Picker.Item label="m" value="m" />
                    <Picker.Item label="cm" value="cm" />
                    <Picker.Item label="mm" value="mm" />
                    <Picker.Item label="yards" value="yards" />
                    <Picker.Item label="feet" value="feet" />
                    <Picker.Item label="inches" value="inches" />
                    <Picker.Item label="MSI" value="MSI" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />

            </View>

            <View style={{ height: Platform.select({ ios: 1, android: 20 }) }} />

          </View>

        </View>

        <View style={{ height: 35 }} />
      </Grid>
    );
  }
}

const styles = StyleSheet.create({
  unitItem: {
    marginLeft:20,
    paddingTop: 3,
    alignItems:'flex-end',
    justifyContent:'flex-end'
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
