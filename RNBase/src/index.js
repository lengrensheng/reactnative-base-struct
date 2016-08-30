/**
 * Created by tiangen on 16/8/30.
 */
import React from 'react';
import {
  AsyncStorage,
} from 'react-native';

import App from './containers';
class Root extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <App/>
    )
  }
}

module.exports = Root;