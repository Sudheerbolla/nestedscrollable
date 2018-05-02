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
      unit: 'pro m',
      priceValue: '5',
      lengthValue: '66',
      widthValue: '19',
      pricePerRoll:'280'
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
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.clearSpace} />

            <DetailTextInput
              title={i18n.t('calculation_price.price').toUpperCase()}
              value={this.state.unit}
              onChangeText={(number) => this.setState({ unit: number })}
            />

            <View style={{ height: 33 }} />

            <DetailTextInput
              title={i18n.t('calculation_price.length').toUpperCase()}
              value={this.state.lengthValue}
              onChangeText={(number) => this.setState({ lengthValue: number })}
            />

            <View style={{ height: 26 }} />

            <DetailTextInput
              title={i18n.t('calculation_price.width').toUpperCase()}
              value={this.state.widthValue}
              onChangeText={(number) => this.setState({ widthValue: number })}
            />

            <View style={{ height: 60 }} />

            <View style={styles.resultContainer}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 }}>
                {applyLetterSpacing(i18n.t('calculation_price.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                <Text style={styles.number}>{applyLetterSpacing('280', 1)}</Text>
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
                    options={['pro 100 m', 'pro m', 'pro m2']}
                    fieldTemplate={this.renderField}
                    style={{ paddingLeft: 30, marginTop: 15, height: 20 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                      this.setState({ unit: value });
                    }}
                  />
                ),
                ios: (
                  <Picker
                    selectedValue={this.state.unit}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ unit: itemValue })}>
                    <Picker.Item label="pro	100	m" value="pro	100	m" />
                    <Picker.Item label="pro	m" value="pro m" />
                    <Picker.Item label="pro	m2" value="pro m2" />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>m</Text>
            </View>

            <View style={{ height: Platform.select({ ios: 54, android: 90 }) }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 35 }} />

            <View style={styles.resultUnitContainer}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
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
