'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {LaunchScreen, Grid4, ImageButton} from '../components/';
import {COLORS, ICONS, FONTS} from '../constants';
import i18n from '../utils/i18n';
import applyLetterSpacing from '../utils/applyLetterSpacing';

class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const self = this;
    setTimeout(function() {
      self.setState({loading: false});
    }, 2000);
  }

  render() {
    return (<View style={styles.container}>
      {
        this.state.loading
          ? (<LaunchScreen/>)
          : (<Grid4>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <ImageButton onPress={() => this.props.navigation.navigate('Calculation', {title: i18n.t('general.calculation').toUpperCase()})
} image={ICONS.START_ICON_1} title={i18n.t('general.calculation').toUpperCase()}/>
                </View>
                <View style={{
                    width: 1,
                    marginTop: 5,
                    backgroundColor: '#000000'
                  }}/>
                <View style={styles.column}>
                  <ImageButton onPress={() => this.props.navigation.navigate('Converter', {title: i18n.t('general.converter').toUpperCase()})
} image={ICONS.START_ICON_2} title={i18n.t('general.converter').toUpperCase()}/>
                </View>
              </View>
              <View style={{
                  height: 1,
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor: '#000000'
                }}/>
              <View style={styles.row}>
                <View style={styles.column}>
                  <ImageButton onPress={() => this.props.navigation.navigate('Calculator', {title: i18n.t('general.calculator').toUpperCase()})
} image={ICONS.START_ICON_3} title={i18n.t('general.calculator').toUpperCase()}/>
                </View>
                <View style={{
                    width: 1,
                    backgroundColor: '#000000'
                  }}/>
                <View style={styles.column}>
                  <ImageButton onPress={() => this.props.navigation.navigate('Contact', {title: i18n.t('general.contact').toUpperCase()})
} image={ICONS.START_ICON_4} title={i18n.t('general.contact').toUpperCase()}/>
                </View>
              </View>

            </View>
          </Grid4>)
      }
    </View>);
  }
}

const {width} = Dimensions.get('window');
const screenHorizontalPadding = 50;
const columnWidth = (width - screenHorizontalPadding) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    width: columnWidth,
    height: columnWidth,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
});

export default Intro;
