import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import * as ReactNavigation from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

import { BackHandler } from 'react-native';

import IntroScreen from '../containers/Intro';
import Calculation from '../containers/Calculation';
import CalculationArea from '../containers/CalculationArea';
import CalculationLength from '../containers/CalculationLength';
import CalculationDiameter from '../containers/CalculationDiameter';
import CalculationConsumption from '../containers/CalculationConsumption';
import CalculationPrice from '../containers/CalculationPrice';
import CalculationPriceM2 from '../containers/CalculationPriceM2';
import Converter from '../containers/Converter';
import ConverterArea from '../containers/ConverterArea';
import ConverterLength from '../containers/ConverterLength';
import ConverterForce from '../containers/ConverterForce';
import ConverterThickness from '../containers/ConverterThickness';
import ConverterMass from '../containers/ConverterMass';
import ConverterPrice from '../containers/ConverterPrice';
import Calculator from '../containers/Calculator';
import CalculatorNew from '../containers/CalculatorNew';
import Contact from '../containers/Contact';

const middleware = createReactNavigationReduxMiddleware('intro', (state) => state.nav);

const addListener = createReduxBoundAddListener('intro');

export const AppNavigator = StackNavigator(
  {
    IntroScreen: { screen: IntroScreen, navigationOptions: { header: null } },
    Calculation: { screen: Calculation, navigationOptions: { header: null } },
    CalculationArea: { screen: CalculationArea, navigationOptions: { header: null } },
    CalculationLength: { screen: CalculationLength, navigationOptions: { header: null } },
    CalculationDiameter: { screen: CalculationDiameter, navigationOptions: { header: null } },
    CalculationConsumption: { screen: CalculationConsumption, navigationOptions: { header: null } },
    CalculationPrice: { screen: CalculationPrice, navigationOptions: { header: null } },
    CalculationPriceM2: { screen: CalculationPriceM2, navigationOptions: { header: null } },
    Converter: { screen: Converter, navigationOptions: { header: null } },
    ConverterArea: { screen: ConverterArea, navigationOptions: { header: null } },
    ConverterLength: { screen: ConverterLength, navigationOptions: { header: null } },
    ConverterForce: { screen: ConverterForce, navigationOptions: { header: null } },
    ConverterThickness: { screen: ConverterThickness, navigationOptions: { header: null } },
    ConverterMass: { screen: ConverterMass, navigationOptions: { header: null } },
    ConverterPrice: { screen: ConverterPrice, navigationOptions: { header: null } },
    Calculator: { screen: Calculator, navigationOptions: { header: null } },
    CalculatorNew: { screen: CalculatorNew, navigationOptions: { header: null } },
    Contact: { screen: Contact, navigationOptions: { header: null } },
  },
  {
    initialRouteName: 'IntroScreen',
    cardStyle: {
      backgroundColor: '#fff',
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

class AppWithNavigationState extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  }

  _shouldCloseApp = nav => {
		if (nav.index > 0) return false;

		if (nav.routes) {
			return nav.routes.every(this._shouldCloseApp);
		}

		return true;
	}

  _goBack = () => this.props.dispatch(ReactNavigation.NavigationActions.back())

  _handleBackPress = () => {
      if (this._shouldCloseApp(this.props.nav)) {
          return false
      }
      this._goBack()
      return true
  }

   componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  onBackPress () {
    const { dispatch, nav } = this.props
    dispatch(NavigationActions.back())
    return nav !== this.props.nav
  }

  render(){
    const { dispatch, nav } = this.props
            const navigation = ReactNavigation.addNavigationHelpers({
                dispatch,
                state: nav
            })
            // return <AppNavigator navigation={navigation} />
    return (<AppNavigator
      navigation={addNavigationHelpers({
        dispatch: dispatch,
        state: nav,
        addListener,
      })}
    />);
  }

}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(AppWithNavigationState);
