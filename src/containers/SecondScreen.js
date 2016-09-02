/**
 * Created by tiangen on 16/8/30.
 */
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ViewActions,ConfigActions} from '../reducers';
import {ViewSelector,ConfigSelector} from '../selectors';
import { Util } from '../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems:'center'
  },
  infoText:{
    fontSize:18,
    color:'#4a91f0',
  },
  tipsText:{
    fontSize:18,
    width:80
  },
  inputView:{
    flex:0,
    flexDirection:'row',
    alignItems: 'center',
    padding:10
  },
  textInputView:{
    flex:1,
    height:36,
    flexDirection:'row',
    alignItems: 'center',
    marginRight:10,
    borderColor: 'gray',
    borderWidth: 1
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#4a91f0',
    height: 50,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
});
class SecondScreen extends Component{
  constructor(props){
    super(props);
    Util.getPureRenderMixin(this);
    this.state = ({
      nameText:null,
      prvText:null,
    });
    this.onPress = this._onPress.bind(this);
  }
  _onPress(){
    const {configActions} = this.props;
    configActions.setUserInfo({
      name:this.state.nameText,
      province:this.state.prvText,
    });
  }
  render(){
    const {userInfo} = this.props;
    const userInfoView = userInfo.name || userInfo.province ? (
      <Text style={styles.infoText}>{`userName:${userInfo.name}\nuserProvince:${userInfo.province}`}</Text>
    ):null;
    const {width} = Dimensions.get('window');
    return(
      <View style={styles.container}>
        {
          userInfoView
        }
        <View style={styles.inputView}>
          <Text style={styles.tipsText}>name:</Text>
          <TextInput
            style={styles.textInputView}
            onChangeText={(nameText) => this.setState({nameText})}
            value={this.state.nameText}/>
        </View>
        <View style={styles.inputView}>
          <Text style={styles.tipsText}>province:</Text>
          <TextInput
            style={styles.textInputView}
            onChangeText={(prvText) => this.setState({prvText})}
            value={this.state.prvText}/>
        </View>
        <TouchableOpacity
          style={[styles.button, { width: width - 120, marginTop: 60 }]}
          key={`key_row`}
          onPress={this.onPress}>
          <Text style={styles.buttonText}>{`设置`}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
SecondScreen.PropTypes = {
};

function mapStateToProps(state, props) {
  return {
    userInfo:ConfigSelector.getUserInfo(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    viewActions: bindActionCreators(ViewActions, dispatch),
    configActions:bindActionCreators(ConfigActions,dispatch),
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SecondScreen);