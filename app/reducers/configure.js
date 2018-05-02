import { createReducer } from '../utils/createReducer';
import { Map, Record, List, fromJS } from 'immutable';
// import { types } from '../constants/base_types';

const Form = Record({
  isFetching: false,
  errors: Map({}),
  distinations: List([])
});

const initialState = new Form();

export default createReducer(initialState, {});
