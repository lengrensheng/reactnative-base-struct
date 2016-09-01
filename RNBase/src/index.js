/**
 * Created by tiangen on 16/8/30.
 */
import React from 'react';
import {
  AsyncStorage,
} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers';
import thunk from 'redux-thunk';

import { Reducers, ViewKeys } from './reducers/index';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';

function configureStore(onComplete) {
  const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
  const logger = createLogger({
    predicate: () => isDebuggingInChrome,
    collapsed: true,
    duration: true,
  });
  const createRNBaseStore = applyMiddleware(thunk, logger)(createStore);
  const store = autoRehydrate()(createRNBaseStore)(Reducers);
  persistStore(store, {
    storage: AsyncStorage,
    transforms: [immutableTransform({})],
    blacklist: [ViewKeys.KEY_ROOT], // 蓝牙的实时状态不需要保存
  }, onComplete);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      store: configureStore(()=> this.setState({
        isLoading: false,
      })),
    }
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <Provider store={this.state.store}>
        <App/>
      </Provider>
    );
  }
}

module.exports = Root;