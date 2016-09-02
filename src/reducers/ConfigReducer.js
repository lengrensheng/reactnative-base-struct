/**
 * Created by tiangen on 16/8/31.
 */
import { createAction, createReducer } from 'redux-act';
import Immutable from 'immutable';

const ConfigKeys = {
  KEY_ROOT: 'configs',
  KEY_DEVICE_ID: 'deviceID',
  KEY_USER_INFO: 'userInfo',
  KEY_FIRST_USE: 'firstUse',
};

const setDeviceID = createAction('setDeviceID');
const setUserInfo = createAction('setUserInfo');
const setFirstUse = createAction('setFirstUse');

const ConfigReducer = createReducer({
  [setDeviceID]: (state, id) => {
    return state.set(ConfigKeys.KEY_DEVICE_ID, id);
  },
  [setUserInfo]: (state, userInfo) => {
    return state.set(ConfigKeys.KEY_USER_INFO, userInfo);
  },
  [setFirstUse]: (state, flag) => {
    return state.set(ConfigKeys.KEY_FIRST_USE, flag);
  },
}, Immutable.fromJS({
  [ConfigKeys.KEY_DEVICE_ID]: null,
  [ConfigKeys.KEY_USER_INFO]: {
    userName: null,
    userId: null,
    accessToken: null,
    iconURL: null,
    province: null,
    type: null,
    unionId: null
  },
  [ConfigKeys.KEY_FIRST_USE]: true
}));//第二个参数为默认值

const ConfigActions = {
  setDeviceID,
  setUserInfo,
  setFirstUse,
};
module.exports = {
  ConfigReducer,
  ConfigActions,
  ConfigKeys,
};