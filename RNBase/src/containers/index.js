/**
 * Created by tiangen on 16/8/30.
 */
import React, { Component, PropTypes } from 'react';
import {
  AppState,
  BackAndroid,
  Navigator,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Util } from '../utils';
import Immutable from 'immutable';
import { ConfigActions, ViewActions,ConfigKeys } from '../reducers';
import { ConfigSelector } from '../selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'transparent',
  },
  navBarItem: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navBarLeftButton: {
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  navBarRightButton: {
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  navBarTitle: {
    justifyContent: 'center',
  },
  navBarTitleText: {
    fontSize: 18,
    color: '#373E4D',
    fontWeight: '500',
    textAlign: 'center',
  },
  navBarTitleWhiteText: {
    color: '#fbfbfb',
  },
  scene: {
    flex: 1,
    backgroundColor: '#EAEAEA',
  },
  navRightTitle: {
    fontSize: 17,
    color: 'white',
  }
});
const kNavTitle = 'title';
const kNavLeftImage = 'leftImage';
const kNavLeftOnPress = 'onLeftPress';
const kNavRightImage = 'rightImage';
const kNavRightOnPress = 'onRightPress';
const kNavRightTitle = 'rightTitle';
const kRightTextColor = 'rightTextColor';
const kIsWhite = 'isWhite';

function getSceneProps(route, navigator, key) {
  const scenes = navigator.state.scenes;
  if (scenes && scenes.hasIn([route.name, key])) {
    return scenes.getIn([route.name, key]);
  }
  if (route[key] !== undefined) {
    return route[key];
  }
  const screen = kScreens[route.name];
  if (screen[key] !== undefined) {
    return screen[key];
  }
  return null;
}

let mLastStatusBarStyleAndroid;
function setStatusBarStyleAndroid(barStyle) {
  if (mLastStatusBarStyleAndroid === barStyle) {
    return;
  }
  mLastStatusBarStyleAndroid = barStyle;
}

const makeScene = require('./makeScene');
const kScreens = {
  get main() {
    return {
      isWhite: true,
      scene: makeScene(require('./MainScreen')),
    };
  },
  get second() {
    return {
      isWhite: false,
      scene: makeScene(require('./SecondScreen')),
    };
  },
};
const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState){
    let source, onPress;
    const custom = navState.scenes || Immutable.fromJS({});
    if (custom.hasIn([route.name, kNavLeftImage])) {
      source = custom.getIn([route.name, kNavLeftImage]);
      onPress = custom.getIn(([route.name, kNavLeftOnPress]));
    } else if (index > 0 && !kScreens[route.name].backDisable) {
      if (custom.hasIn([route.name, kNavLeftOnPress])) {
        onPress = custom.getIn(([route.name, kNavLeftOnPress]));
      } else {
        onPress = ()=>navigator.pop();
      }
      source = getSceneProps(route, navigator, kIsWhite) ? require('../images/ic_nav_back_white.png')
        : require('../images/ic_nav_back_black.png');
    }
    if (__DEV__)console.log(`source:${source},onPress:${onPress ? 'ok' : 'undefined'}`);
    if (source && onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.navBarItem, styles.navBarLeftButton]}>
            <Image source={source}/>
          </View>
        </TouchableOpacity>
      )
    }
    return null;
  },
  RightButton(route, navigator, index, navState){
    let source, onPress, rightTitle, rightColor;
    const custom = navState.scenes || Immutable.fromJS({});
    if (custom.hasIn([route.name, kNavRightImage])) {
      source = custom.getIn([route.name, kNavRightImage]);
      onPress = custom.getIn(([route.name, kNavRightOnPress]));
    }

    if (custom.hasIn([route.name, kNavRightTitle])) {
      //右边按钮为文字
      rightColor = custom.getIn([route.name, kNavRightTitle]);
      rightTitle = custom.getIn([route.name, kNavRightTitle]);
      onPress = custom.getIn(([route.name, kNavRightOnPress]));
    }

    if ((rightTitle || source) && onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.navBarItem, styles.navBarRightButton]}>
            {rightTitle ? <Text style={[styles.navBarTitle, {
              color: rightColor ? rightColor :
                'white'
            }]}>{rightTitle}</Text> : <Image source={source}/>}
          </View>
        </TouchableOpacity>
      )
    }
    return null;
  },
  Title(route, navigator, index, navState){
    const isWhite = getSceneProps(route, navigator, kIsWhite);
    setStatusBarStyleAndroid(isWhite ? 'light-content' : 'default');
    return (
      <View style={[styles.navBarItem, styles.navBarTitle]}>
        <Text
          style={[styles.navBarTitleText, isWhite ? styles.navBarTitleWhiteText : {}]}>{getSceneProps(route, navigator, kNavTitle)}</Text>
      </View>
    )
  },
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: null,
      lastSyncTime: 0,
    };
    this.handleBackAndroid = this._handleBackAndroid.bind(this);
    this.handleAppStateChange = this._handleAppStateChange.bind(this);
    this.renderScene = this._renderScene.bind(this);
    this.configureScene = this._configureScene.bind(this);
    this.onNewFocus = this._onNewFocus.bind(this);

    Util.getPureRenderMixin(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackAndroid)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this.handleBackAndroid)
    }
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  _handleBackAndroid() {
    const routes = this.refs.navigator.getCurrentRoutes();
    const count = routes && routes.length;
    if (count > 1) {
      this.refs.navigator.pop();
    } else {
      BackAndroid.exitApp();
    }
    return true;
  }

  _handleAppStateChange(currentAppState) {
    this.props.viewActions.setAppState(currentAppState);
  }

  _renderScene(route, navigator) {
    const Scene = kScreens[route.name].scene;
    const barStyle = getSceneProps(route, navigator, kIsWhite) ? 'light-content' : 'default';
    setStatusBarStyleAndroid(barStyle);
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={barStyle}/>
        <Scene
          key={route.name}
          name={route.name}
          navigator={navigator}
          {...route.params}
        />
      </View>
    );
  }

  _configureScene(route, routeStack) {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _onNewFocus(route) {
    if (route) {
      if (__DEV__)console.log(`onFocus:${route.name}`);
      this.setState({ focus: route });
      this.props.viewActions.setFocus(route.name);
    } else {
      console.warn(`onFocus: Unable to focus to ${route}`);
    }
  }

  render() {
    let navigationBar;
    const focus = this.state.focus;
    if (focus && !kScreens[focus.name].hideNav) {
      navigationBar = (
        <Navigator.NavigationBar
          navigationStyles={Navigator.NavigationBar.StylesIOS}
          routeMapper={NavigationBarRouteMapper}
          style={[styles.navBar, kScreens[focus.name].navStyle, focus.navStyle]}
        />
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Navigator
          ref={'navigator'}
          initialRoute={{ name: 'main' }}
          configureScene={this.configureScene}
          renderScene={this.renderScene}
          onWillFocus={this.onNewFocus}
          sceneStyle={styles.scene}
          navigationBar={navigationBar}
        />
      </View>
    );
  }
}
App.propTypes = {};

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewActions: bindActionCreators(ViewActions, dispatch),
    configActions: bindActionCreators(ConfigActions, dispatch),
  };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(App);