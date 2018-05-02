import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../screens';

const secondAction = AppNavigator.router.getActionForPathAndParams('IntroScreen');
const initialNavState = AppNavigator.router.getStateForAction(secondAction);

export default function nav(state = initialNavState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
}
