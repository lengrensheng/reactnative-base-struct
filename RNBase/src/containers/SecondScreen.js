/**
 * Created by tiangen on 16/8/30.
 */
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ViewActions} from '../reducers';
import {ViewSelector,ConfigSelector} from '../selectors';
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  }
});
import { Util } from '../utils';

class SecondScreen extends Component{
  constructor(props){
    super(props);
    Util.getPureRenderMixin(this);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Second Page</Text>
      </View>
    )
  }
}
SecondScreen.PropTypes = {
};

function mapStateToProps(state, props) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewActions: bindActionCreators(ViewActions, dispatch),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SecondScreen);