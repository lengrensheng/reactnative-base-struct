/**
 * Created by tiangen on 16/8/30.
 */
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    backgroundColor:'#4a91f0',
    height:60,
    width:120,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },
  buttonText:{
    fontSize:16,
    color:'white',
  }
});
class MainScreen extends Component{
 constructor(props){
   super(props);
   this.onPress = this._onPress.bind(this);
 }

 _onPress(){
   const {navigator} = this.props;
   navigator.push({
     name:'second',
     title:'SecondPage',
     isWhite:false
   });
 }
  render(){
    const {width} = Dimensions.get('window');
    return(
      <View style={[styles.container]}>
        <Text>MainScreen</Text>
        <TouchableOpacity
          style={[styles.button,{width:width-40,marginTop:40}]}
          key = {`key_row`}
          onPress = {this.onPress}>
        <Text style={styles.buttonText}>Go Second Page</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

MainScreen.PropTypes={

};

module.exports = MainScreen;