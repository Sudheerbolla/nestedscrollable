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
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  KeyboardAvoidingView
} from 'react-native';

import { DetailTextInput } from '../components';
import { COLORS, ICONS, FONTS } from '../constants';
import NavBarDetailSmall from '../modules/NavBarDetailSmall';
import i18n from '../utils/i18n';
import SupText from '../utils/SupText';
import applyLetterSpacing from '../utils/applyLetterSpacing';
import MarqueeText from 'react-native-marquee';

import Communications from 'react-native-communications';

const { width, height } = Dimensions.get('window');
var needToReplaceDotWithComma=false;
const space = Platform.select({ ios: 5, android: 2 });

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
    } else {
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
          <KeyboardAvoidingView behavior={'padding'} style={styles.container}>

              <ScrollView style={{flexGrow: 1}}>

                <View style={styles.grid}>

                  <View style={styles.logoContainer}>
                    <Image source={ICONS.LOGO} style={styles.logo} />
                  </View>

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
                  <Text style={{color: this.state.TellerrollenBg}}>{i18n.t('calculation_diameter.tellerrollen').toUpperCase()}</Text>
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
                  <Text style={{color: this.state.SAFRollenBg}}>{i18n.t('calculation_diameter.saf_rollen').toUpperCase()}</Text>
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

            </View>

            <View style={{ height: 40 }} />

            <View style={styles.footerContainer}>

              <Image source={ICONS.BRAND_BAR} style={styles.brandBar} />

            </View>

          </ScrollView>

        </KeyboardAvoidingView>
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

  renderField(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings;
    return (
      <View style={styles.container}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={{
              justifyContent: 'center',
              alignSelf: "stretch",
              alignItems: 'center'
              }}>
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

      <View style={styles.container}>

        <View style={{ height: 35 }} />

        <View style={styles.horizontalStyle}>

          <View style={{
            width:'65%',
            padding:8
          }}>

            <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>
              {applyLetterSpacing(i18n.t('calculation_diameter.core').toUpperCase(), 5)}
            </Text>

          </View>

          <View style={{ width: '35%',padding:8 }}>

            <View style={{
              borderWidth: 1,
              borderColor: COLORS.DARK_GREY
              }}/>

                <CustomPicker
                  options={[i18n.t('calculation_diameter.unit1'),i18n.t('calculation_diameter.unit2')]}
                  fieldTemplate={this.renderField}
                  style={{ margin: 5, height: 22 }}
                  value={this.state.unit}
                  onValueChange={(value) => {
                    this.setState({ unit: value },function(){this.updateAllValues()});
                  }}
                />

            <View style={{
              borderWidth: 1,
              borderColor: COLORS.DARK_GREY
              }}/>

          </View>

        </View>

        <View style={{ height: 35 }} />

        <View style={styles.horizontalStyle}>

          <View style={{width:'70%'}}>

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

          </View>

          <View style={{ width: '30%',padding:8,marginTop:25 }}>
              <View style={{justifyContent: 'center',
                    alignSelf: "stretch",
                    alignItems: 'center'}}>
                     <Text style={{ marginTop: 5, height: 22 }}>m</Text>
              </View>
            </View>

        </View>

        <View style={{height: 35 }} />

        <View style={styles.horizontalStyle}>

          <View style={{width:'70%'}}>

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

          </View>

          <View style={{ width: '30%',padding:8,marginTop:25 }}>
              <View style={{justifyContent: 'center',
                    alignSelf: "stretch",
                    alignItems: 'center'}}>
                     <Text style={{ marginTop: 5, height: 22 }}>μm</Text>
              </View>

            </View>

        </View>

        <View style={{ height: 85 }} />

        <View style={{
          flexDirection: 'row',
          flexGrow: 1,
          width:'100%',
          alignSelf: "stretch",
        }}>

        <View style={{width:'24%'}}>
          <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, color: COLORS.DARK_GREY, margin:5 }}>
            {applyLetterSpacing(i18n.t('calculation_diameter.result').toUpperCase(), space)}
          </Text>

        </View>

        <View style={{
              width:'76%',
              flexGrow: 1,
              justifyContent: 'center',
              alignSelf: "stretch",
              alignItems: 'center',
            }}>

            <View style={styles.resultContainerNew}>

            <View style={styles.resultValue}>
              <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                       {applyLetterSpacing(this.state.diameterInMM, 1)}
              </MarqueeText>
            </View>

            <View style={{width:'30%'}}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'mm'}
              />
            </View>

            </View>

            <View style={styles.resultContainerNew}>

            <View style={styles.resultValue}>
              <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                       {applyLetterSpacing(this.state.diameterInInches, 1)}
              </MarqueeText>
            </View>

            <View style={{width:'30%'}}>
              <SupText
                textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                style={styles.unitItem}
                text={'inches'}
              />
            </View>

            </View>

        </View>

        </View>

      </View>

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

    renderField(settings) {
      const { selectedItem, defaultText, getLabel, clear } = settings;
      return (
        <View style={styles.container}>
          <View>
            {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
            {selectedItem && (
              <View style={{
                justifyContent: 'center',
                alignSelf: "stretch",
                alignItems: 'center'
                }}>
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
        <View style={styles.container}>

          <View style={{ height: 35 }} />

          <View style={styles.horizontalStyle}>

            <View style={{
              width:'65%',
              padding:8
            }}>
              <Text style={{ color: COLORS.DARK_GREY, fontFamily: FONTS.FONT_BOLD, fontSize: 15 }}>
                {applyLetterSpacing(i18n.t('calculation_diameter.core').toUpperCase(), 5)}
              </Text>

            </View>

            <View style={{ width: '35%',padding:8 }}>

              <View style={{
                borderWidth: 1,
                borderColor: COLORS.DARK_GREY
                }}/>

                  <CustomPicker
                    options={[i18n.t('calculation_diameter.unit1'),i18n.t('calculation_diameter.unit2')]}
                    fieldTemplate={this.renderField}
                    style={{ margin: 5, height: 22 }}
                    value={this.state.unit}
                    onValueChange={(value) => {
                      this.setState({ unit: value },function(){this.updateAllValues()});
                    }}
                  />

              <View style={{
                borderWidth: 1,
                borderColor: COLORS.DARK_GREY
                }}/>

            </View>

          </View>

          <View style={{ height: 35 }} />

          <View style={styles.horizontalStyle}>

            <View style={{width:'70%'}}>

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

            </View>

            <View style={{ width: '30%',padding:8,marginTop:25 }}>
                <View style={{justifyContent: 'center',
                      alignSelf: "stretch",
                      alignItems: 'center'}}>
                       <Text style={{ marginTop: 5, height: 22 }}>mm</Text>
                </View>
              </View>

          </View>

          <View style={{height: 35 }} />

          <View style={styles.horizontalStyle}>

            <View style={{width:'70%'}}>

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

            </View>

            <View style={{ width: '30%',padding:8,marginTop:25 }}>
                <View style={{justifyContent: 'center',
                      alignSelf: "stretch",
                      alignItems: 'center'}}>
                       <Text style={{ marginTop: 5, height: 22 }}>μm</Text>
                </View>

              </View>

          </View>

          <View style={{height: 35 }} />

          <View style={styles.horizontalStyle}>

            <View style={{width:'70%'}}>

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

            </View>

            <View style={{ width: '30%',padding:8,marginTop:25 }}>
                <View style={{justifyContent: 'center',
                      alignSelf: "stretch",
                      alignItems: 'center'}}>
                       <Text style={{ marginTop: 5, height: 22 }}>m</Text>
                </View>

              </View>

          </View>

          <View style={{height: 35 }} />

          <View style={styles.horizontalStyle}>

            <View style={{width:'70%'}}>

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

            </View>

            <View style={{ width: '30%',padding:8,marginTop:25 }}>
                <View style={{justifyContent: 'center',
                      alignSelf: "stretch",
                      alignItems: 'center'}}>
                       <Text style={{ marginTop: 5, height: 22 }}>mm</Text>
                </View>

              </View>

          </View>

          <View style={{ height: 85 }} />

          <View style={{
            flexDirection: 'row',
            flexGrow: 1,
            width:'100%',
            alignSelf: "stretch",
          }}>

          <View style={{width:'24%'}}>
            <Text style={{ fontFamily: FONTS.FONT_BOLD, fontSize: 15, color: COLORS.DARK_GREY, margin:5 }}>
              {applyLetterSpacing(i18n.t('calculation_diameter.result').toUpperCase(), space)}
            </Text>

          </View>

          <View style={{
                width:'76%',
                flexGrow: 1,
                justifyContent: 'center',
                alignSelf: "stretch",
                alignItems: 'center',
              }}>

              <View style={styles.resultContainerNew}>

              <View style={styles.resultValue}>
                <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                         {applyLetterSpacing(this.state.diameterInMM, 1)}
                </MarqueeText>
              </View>

              <View style={{width:'30%'}}>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'mm'}
                />
              </View>

              </View>

              <View style={styles.resultContainerNew}>

              <View style={styles.resultValue}>
                <MarqueeText style={styles.number} duration={3000} loop marqueeOnStart marqueeDelay={1000} marqueeResetDelay={900}>
                         {applyLetterSpacing(this.state.diameterInInches, 1)}
                </MarqueeText>
              </View>

              <View style={{width:'30%'}}>
                <SupText
                  textStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 18 }}
                  supStyle={{ fontFamily: FONTS.FONT_BOLD, fontSize: 11 }}
                  style={styles.unitItem}
                  text={'inches'}
                />
              </View>

              </View>
          </View>
          </View>
        </View>
      );
    }

}

const styles = StyleSheet.create({
  horizontalStyle:{
    flexDirection: 'row',
    flexGrow: 1,
    width:'100%',
    justifyContent: 'center',
    alignSelf: "stretch",
    alignItems: 'center',
  },
  unitItem: {
    height: 35,
    paddingTop: 3,
    marginLeft: 10
  },
  number: {
    fontSize: 20,
    height: 35,
    color: COLORS.DARK_GREY,
    textAlign:'right',
    marginLeft:10,
    marginRight:10
  },
  container: {
    flexGrow: 1
  },
  grid: {
    flex: 1,
    marginHorizontal: 25,
  },
  logoContainer: {
    alignItems: 'flex-end',
    marginTop: 6,
    padding: 0,
  },
  logo: {
    resizeMode: 'contain',
    width: width * 0.43,
    marginRight: -1,
  },
  footerContainer: {
    position: 'absolute',
    bottom: -5,
  },
  brandBar: {
    width: width,
    resizeMode: 'contain',
  },
  resultContainerNew:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: "stretch",
    alignItems: 'center',
  },
  resultValue:{
    width:'70%',
    justifyContent: 'flex-end',
    alignItems:'flex-end',
    paddingRight:5
  }
});
