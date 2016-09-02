/**
 * Created by tiangen on 16/8/31.
 */
import {
  AppState,
} from 'react-native';

import {
  createAction,
  createReducer,
} from 'redux-act';

import Immutable from 'immutable';

const ViewKeys = {
  KEY_ROOT: 'views',
  KEY_FOCUS: 'focus',
  KEY_APP_STATE: 'appState',
};

const setFocus = createAction('View.setFocus');
const setAppState = createAction('View.setAppState');

const ViewReducer = createReducer({
  [setFocus]: (state, focus) => {
    return state.set(ViewKeys.KEY_FOCUS, focus);
  },
  [setAppState]: (state, appState) => {
    return state.set(ViewKeys.KEY_APP_STATE, appState);
  },
}, Immutable.fromJS({
  [ViewKeys.KEY_FOCUS]: null,
  [ViewKeys.KEY_APP_STATE]: AppState.currentState,
}));

const ViewActions = {
  setFocus,
  setAppState,
};

module.exports = {
  ViewActions,
  ViewReducer,
  ViewKeys,
};