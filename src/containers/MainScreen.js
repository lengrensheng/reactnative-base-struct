/**
 * Created by tiangen on 16/8/30.
 */
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ViewActions,ConfigActions,ViewKeys,ConfigKeys } from '../reducers';
import {ViewSelector,ConfigSelector} from '../selectors/index';
import { Util } from '../utils';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#4a91f0',
    height: 60,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  infoText:{
    fontSize:16,
    color:'#4a91f0'
  },
  marginTop20:{
    marginTop:20,
  }
});
class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Go Second Page',
    };
    this.onPress = this._onPress.bind(this);
    Util.getPureRenderMixin(this);
  }

  _onPress() {
    const { navigator } = this.props;
    navigator.push({
      name: 'second',
      title: 'SecondPage',
      isWhite: false,
    });
  }

  render() {
    const { isActive,userInfo } = this.props;
    const { width } = Dimensions.get('window');
    const userInfoView = userInfo.name?(
      <Text style={styles.infoText}>{`userName:${userInfo.name}\nprovince:${userInfo.province}`}</Text>
    )
    :null;
    return (
      <View style={[styles.container]}>
        {
          userInfoView
        }
        <Text style={styles.marginTop20}>{`isActive:${isActive}`}</Text>
        <Text style={styles.marginTop20}>{`MainScreen`}</Text>
        <TouchableOpacity
          style={[styles.button, { width: width - 40, marginTop: 40 }]}
          key={`key_row`}
          onPress={this.onPress}>
          <Text style={styles.buttonText}>{this.state.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

MainScreen.PropTypes = {};

function mapStateToProps(state, props) {
  return {
    focus: ViewSelector.getFocus(state),
    isActive:ViewSelector.isActive(state,props),
    userInfo:ConfigSelector.getUserInfo(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewActions: bindActionCreators(ViewActions, dispatch),
    configActions:bindActionCreators(ConfigActions,dispatch),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(MainScreen);