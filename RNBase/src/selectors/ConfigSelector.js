/**
 * Created by tiangen on 16/8/31.
 */
import { ConfigKeys } from '../reducers';
function getValue(state, key) {
  return state[ConfigKeys.KEY_ROOT].get(key);
}

const ConfigSelector = {
  getUserInfo(state){
    return getValue(state, ConfigKeys.KEY_USER_INFO);
  },
  isFirstUse(state){
    return getValue(state, ConfigKeys.KEY_FIRST_USE);
  },
};

module.exports = ConfigSelector;