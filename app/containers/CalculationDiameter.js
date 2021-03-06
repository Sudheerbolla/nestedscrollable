'use strict';

import React, { Component } from 'react';
import { CustomPicker } from 'react-native-custom-picker';
import { StyleSheet, View, Text, TextInput, Picker, Dimensions, Platform, ImageBackground,TouchableOpacity, ScrollView,Share } from 'react-native';
import { Grid, DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetailSmall from '../modules/NavBarDetailSmall';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';

import Communications from 'react-native-communications';

const { width, height } = Dimensions.get('window');
var needToReplaceDotWithComma=false;

export default class CalculationDiameter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TellerrollenBg:'rgba(0, 0, 0, 1)',
      SAFRollenBg:'rgba(0, 0, 0, 0.4)',
      tv:true,
      sv:false,
      textToShare:''
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

  shareTextWithTitle() {
    let emailsubject ='Tesa Tape Calculator - Diameter';
    if(Platform.OS === 'ios') {
      Share.share({
        message: this.state.textToShare,
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
        message: this.state.textToShare,
        title: emailsubject,
        url: this.state.textToShare,
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

  updateShareText(result){
    this.setState({textToShare : result});
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <Grid>
        <View style={{ height: 22 }} />
        <NavBarDetailSmall
          onBack={() => {
            this.props.navigation.goBack();
          }}
          titleStyle={{ fontSize: 22 }}
          title={i18n.t('calculation_diameter.diameter').toUpperCase()}
          rightButton={true}
          onRight={() => {
            this.shareTextWithTitle()
          }}
        />

        <View style={{flexDirection: 'row',height:50,marginTop:10,padding:3}}>
        <TouchableOpacity onPress={() => {
          this.setState({ tv: true,sv:false,SAFRollenBg:'rgba(0, 0, 0, 0.4)',TellerrollenBg:'rgba(0, 0, 0, 1)', })
        }} style={{
          width:'50%',
          padding:1,
          justifyContent:'center',
          alignItems: 'center',
          height:38
        }}>
          <Text style={{color: this.state.TellerrollenBg}}> Tellerrollen </Text>
          <View style={{
            backgroundColor: this.state.TellerrollenBg,
            height:5,
            marginTop:4,
            width:'100%'
          }}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.setState({ tv: false,sv:true,TellerrollenBg:'rgba(0, 0, 0, 0.4)',SAFRollenBg:'rgba(0, 0, 0, 1)',
         })
        }} style={{
          width:'50%',
          padding:1,
          justifyContent:'center',
          alignItems: 'center',
          height:38
        }}>
          <Text style={{color: this.state.SAFRollenBg}}> SAF-Rollen </Text>
          <View style={{
            backgroundColor: this.state.SAFRollenBg,
            height:5,
            marginTop:4,
            width:'100%'
          }}/>
        </TouchableOpacity>
        </View>

        { this.state.tv &&
          <TellerrollenScreen callback={this.updateShareText.bind(this)}/>
        }
        { this.state.sv &&
          <SAFRollenScreen callback={this.updateShareText.bind(this)}/>
        }

        <View style={{ height: 35 }} />
      </Grid>
    );
  }

}

class TellerrollenScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      unit: i18n.t('calculation_diameter.unit1'),
      lengthValue: '66',
      thickNessValue: '205',
      '3KernZollDiameter':82,//mm
      '6KernZollDiameter':160,//mm
      diameterInMM:'154.761',
      diameterInInches:'6.093',
    };
      this.shareTextWithTitle();
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

  calculateOuterDiameter = () => {
    var coreDiameter=1;
    var length=this.state.lengthValue;
    var thicknessValue=this.state.thickNessValue;
    if(Platform.OS === 'ios') {
      if(length.includes(',')){
         length = length.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
      if(thicknessValue.includes(',')){
         thicknessValue = thicknessValue.toString().replace(',', '.')
         needToReplaceDotWithComma=true;
      }
    }

    if(this.state.unit==i18n.t('calculation_diameter.unit1')){
      coreDiameter=82;
    } else if (this.state.unit==i18n.t('calculation_diameter.unit2')) {
      coreDiameter=160;
    }

    var underRootValue=(((coreDiameter/1000)*(coreDiameter/1000))+(4/3.141592)*length*(thicknessValue/1000000))
    // var underRootValue=((this.state.thickNessValue*this.state.lengthValue)/3.141)+((coreDiameter/2)*(coreDiameter/2));

    var diameter=1000*(Math.sqrt(underRootValue))
    return diameter;
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
    if(this.state.lengthValue.includes(',')||this.state.thickNessValue.includes(','))
      needToReplaceDotWithComma=true
    else needToReplaceDotWithComma=false

    this.setState({
      diameterInMM:this.getCalculatedValue('mm'),
      diameterInInches:this.getCalculatedValue('inches')
    });
    this.shareTextWithTitle();
  }

  getCalculatedValue = (conv) => {
    var outPut = '';
    var diameterInMM=this.calculateOuterDiameter();
    var diameterInInches =0.0393701*diameterInMM;
    if(conv=='mm')
      outPut=diameterInMM;
    else if(conv=='inches') {
      outPut=diameterInInches;
    }
    outPut=this.round(outPut, 3);
    if(needToReplaceDotWithComma){
      if(outPut.toString().includes('.')){
         outPut = outPut.toString().replace('.', ',');
      }
    }
    return outPut.toString();
  }

  isNumberGreaterThanLimit = (value,limit) => {
    return parseFloat(value) > limit;
  }

  hasMoreThanOneDecimalPoints = (value) => {
    return ((value.split('\.').value-1)>1||(value.split('\,').value-1)>1);
  }

  shareTextWithTitle() {
    let textToShare = 'Input: \n'+ 'Length: '+this.state.lengthValue+' m, Thicknesss: '+this.state.thickNessValue+' μm \n \n'
    +'Result: \n'
    + this.state.diameterInMM +' MM'
    +'\n'+this.state.diameterInInches+' Inches';

    this.props.callback(textToShare);
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <View style={styles.coreDiameterText}>
            <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>
              {applyLetterSpacing(i18n.t('calculation_diameter.core').toUpperCase(), 5)}
            </Text>
          </View>

          <DetailTextInput
            title={i18n.t('calculation_diameter.length').toUpperCase()}
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
                if(this.isNumberGreaterThanLimit(number, 500000)){
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
            title={i18n.t('calculation_diameter.thickness').toUpperCase()}
            value={this.state.thickNessValue}
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
                if(this.isNumberGreaterThanLimit(number, 25000)){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

                if(!this.validateDecimal(number)) {
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

              }

              this.setState({ thickNessValue: number },function(){this.updateAllValues()});
              }
            }
          />

          <View style={{ height: 60 }} />

          <View style={styles.resultContainer}>
            <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 , margin:5}}>
              {applyLetterSpacing(i18n.t('calculation_diameter.result').toUpperCase(), 5)}
            </Text>
            <View style={styles.resultNumber}>
              <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                       {applyLetterSpacing(this.state.diameterInMM, 1)}
              </MarqueeText>
              <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                       {applyLetterSpacing(this.state.diameterInInches, 1)}
              </MarqueeText>
            </View>
          </View>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.unitContainer}>
            <View style={styles.pickerTopBorder} />

            {Platform.select({
              android: (
                <CustomPicker
                  options={[i18n.t('calculation_diameter.unit1'),i18n.t('calculation_diameter.unit2')]}
                  fieldTemplate={this.renderField}
                  style={{ paddingLeft: 20, marginTop: 22, height: 28 }}
                  value={this.state.unit}
                  onValueChange={(value) => {
                    this.setState({ unit: value },function(){this.updateAllValues()});
                  }}
                />
              ),
              ios: (
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.unit}
                  itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                  onValueChange={(itemValue, itemIndex) => {
                    this.setState({ unit: itemValue },function(){this.updateAllValues()});
                  }}>
                  <Picker.Item label={i18n.t('calculation_diameter.unit1')} value={i18n.t('calculation_diameter.unit1')} />
                  <Picker.Item label={i18n.t('calculation_diameter.unit2')} value={i18n.t('calculation_diameter.unit2')} />
                </Picker>
              ),
            })}

            <View style={styles.pickerBottomBorder} />
          </View>

          <View style={{ height: Platform.select({ ios: 52.5, android: 90 }) }} />

          <View style={styles.unitWidth}>
            <Text style={styles.unitWidthLabel}>m</Text>
          </View>

          <View style={{ height: 60.5 }} />

          <View style={styles.unitWidth}>
            <Text style={styles.unitWidthLabel}>μm</Text>
          </View>

          <View style={{ height: 38 }} />

          <View style={styles.resultUnitContainer}>
            <SupText
              textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
              supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
              style={styles.unitItem}
              text={'mm'}
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
    );
  }

}

class SAFRollenScreen extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        unit: i18n.t('calculation_diameter.unit1'),
        lengthValue: '66',
        widthValue: '19',
        coreWidthValue: '600',
        thickNessValue: '205',
        '3KernZollDiameter':82,//mm
        '6KernZollDiameter':160,//mm
        diameterInMM:'28.542',
        diameterInInches:'1.124',
      };
      this.shareTextWithTitle();
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

    calculateOuterDiameter = () => {
      var coreDiameter=1;
      var lengthValue=this.state.lengthValue;
      var coreWidthValue=this.state.coreWidthValue;
      var thickNessValue=this.state.thickNessValue;
      var widthValue=this.state.widthValue;
      if(Platform.OS === 'ios') {
        if(widthValue.includes(',')){
           widthValue = widthValue.toString().replace(',', '.')
           needToReplaceDotWithComma=true;
        }
        if(thickNessValue.includes(',')){
           thickNessValue = thickNessValue.toString().replace(',', '.')
           needToReplaceDotWithComma=true;
        }
        if(coreWidthValue.includes(',')){
           coreWidthValue = coreWidthValue.toString().replace(',', '.')
           needToReplaceDotWithComma=true;
        }
        if(lengthValue.includes(',')){
           lengthValue = lengthValue.toString().replace(',', '.')
           needToReplaceDotWithComma=true;
        }
      }

      if(this.state.unit==i18n.t('calculation_diameter.unit1')){
        coreDiameter=82;
      } else if (this.state.unit==i18n.t('calculation_diameter.unit2')) {
        coreDiameter=160;
      }

      var underRootValue=(((coreDiameter/1000)*(coreDiameter/1000))+(4/coreWidthValue)*1000*(lengthValue/3.141592)*(thickNessValue/1000000))*(widthValue/1000)

      var diameter=1000*(Math.sqrt(underRootValue))*1.1
      return diameter;
    }

    updateAllValues = () => {

      if(this.state.coreWidthValue.includes(',')||this.state.widthValue.includes(',')||this.state.lengthValue.includes(',')||this.state.thickNessValue.includes(','))
        needToReplaceDotWithComma=true
      else needToReplaceDotWithComma=false

      this.setState({
        diameterInMM:this.getCalculatedValue('mm'),
        diameterInInches:this.getCalculatedValue('inches')
      });
      this.shareTextWithTitle();
    }

    getCalculatedValue = (conv) => {
      var outPut = '';
      var diameterInMM=this.calculateOuterDiameter();
      var diameterInInches =0.0393701*diameterInMM;
      if(conv=='mm')
        outPut=diameterInMM;
      else if(conv=='inches') {
        outPut=diameterInInches;
      }
      outPut=this.round(outPut, 3);
      if(needToReplaceDotWithComma){
        if(outPut.toString().includes('.')){
           outPut = outPut.toString().replace('.', ',');
        }
      }
      return outPut.toString();
    }

    shareTextWithTitle() {
      let emailsubject='Tesa Tape Calculator - Diameter';

      let textToShare='Input: \n'+ 'Length: '+this.state.lengthValue+' m, Thicknesss: '+this.state.thickNessValue+' μm, Width(Core): '+ this.state.coreWidthValue+' mm, Width(Material): '+this.state.widthValue+' mm \n \n'
      +'Result: \n'
      + this.state.diameterInMM +' MM'
      +'\n'+this.state.diameterInInches+' Inches';

      this.props.callback(textToShare);
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
      return (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <View style={styles.coreDiameterText}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>
                {applyLetterSpacing(i18n.t('calculation_diameter.core').toUpperCase(), 5)}
              </Text>
            </View>

          <DetailTextInput
            title={'width(Core)'.toUpperCase()}
            value={this.state.coreWidthValue}
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
                if(this.isNumberGreaterThanLimit(number, 10000)){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

                if(!this.validateDecimal(number)) {
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }

              }

              this.setState({ coreWidthValue: number },function(){this.updateAllValues()});
              }
            }
          />

          <View style={{ height: 30 }} />

          <DetailTextInput
            title={i18n.t('calculation_diameter.thickness').toUpperCase()}
            value={this.state.thickNessValue}
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
                if(this.isNumberGreaterThanLimit(number, 25000)){
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }
                if(!this.validateDecimal(number)) {
                  alert(i18n.t('converter_area.outOfRangeAlert'));
                  return;
                }
              }

              this.setState({ thickNessValue: number },function(){this.updateAllValues()});
              }
            }
          />

          <View style={{ height: 30 }} />

          <DetailTextInput
            title={i18n.t('calculation_diameter.length').toUpperCase()}
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
                if(this.isNumberGreaterThanLimit(number, 500000)){
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

          <View style={{ height: 30 }} />

          <DetailTextInput
            title={'Width(Material)'.toUpperCase()}
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
                if(this.isNumberGreaterThanLimit(number, 25000)){
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
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15, top: 8 , margin:5}}>
                {applyLetterSpacing(i18n.t('calculation_diameter.result').toUpperCase(), 5)}
              </Text>
              <View style={styles.resultNumber}>
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.diameterInMM, 1)}
                </MarqueeText>
                <MarqueeText style={styles.number} duration={3000} marqueeOnStart loop marqueeDelay={1000} marqueeResetDelay={1000}>
                         {applyLetterSpacing(this.state.diameterInInches, 1)}
                </MarqueeText>
              </View>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.unitContainer}>
              <View style={styles.pickerTopBorder} />

              {Platform.select({
                android: (
                  <CustomPicker
                    options={[i18n.t('calculation_diameter.unit1'),i18n.t('calculation_diameter.unit2')]}
                    fieldTemplate={this.renderField}
                    style={{ paddingLeft: 20, marginTop: 22, height: 28 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                      this.setState({ unit: value },function(){this.updateAllValues()});
                    }}
                  />
                ),
                ios: (
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.unit}
                    itemStyle={{ fontSize: 15, color: COLORS.DARK_GREY }}
                    onValueChange={(itemValue, itemIndex) => {
                      this.setState({ unit: itemValue },function(){this.updateAllValues()});
                    }}>
                    <Picker.Item label={i18n.t('calculation_diameter.unit1')} value={i18n.t('calculation_diameter.unit1')} />
                    <Picker.Item label={i18n.t('calculation_diameter.unit2')} value={i18n.t('calculation_diameter.unit2')} />
                  </Picker>
                ),
              })}

              <View style={styles.pickerBottomBorder} />
            </View>

            <View style={{ height: Platform.select({ ios: 52.5, android: 90 }) }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 60.5 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>μm</Text>
            </View>

            <View style={{ height: 40 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>m</Text>
            </View>

            <View style={{ height: 55 }} />

            <View style={styles.unitWidth}>
              <Text style={styles.unitWidthLabel}>mm</Text>
            </View>

            <View style={{ height: 52 }} />

            <View style={styles.resultUnitContainer}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'mm'}
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
      );
    }

}

const styles = StyleSheet.create({
  resultUnitContainer: {
    flex: 1,
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
  picker: {
    height: 85,
    top: -70,
    ...Platform.select({
      android: {
        top: 0,
      },
    }),
  },
  unitContainer: {
    width: 100,
    ...Platform.select({
      android: {
        // paddingTop: 70,
      },
    }),
  }, unitContainerLarge: {
      width: 150,
  },
  unitWidth: {
    height: 42,
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingTop: -145,
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
    top: 20,
    left: 15,
    ...Platform.select({
      android: {
        top: 30,
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
        bottom: -10,
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
