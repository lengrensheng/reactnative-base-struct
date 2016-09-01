/**
 * Created by tiangen on 16/8/30.
 */
import { combineReducers } from 'redux';
import { ConfigReducer, ConfigActions, ConfigKeys } from './ConfigReducer';
import { ViewReducer, ViewActions, ViewKeys } from './ViewReducer';

const Reducers = combineReducers({
  [ConfigKeys.KEY_ROOT]: ConfigReducer,
  [ViewKeys.KEY_ROOT]: ViewReducer,//显示状态,不保存到数据库
});

module.exports = {
  Reducers,
  ConfigActions,
  ConfigKeys,
  ViewKeys,
  ViewActions,
};