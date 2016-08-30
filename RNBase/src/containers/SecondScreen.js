/**
 * Created by tiangen on 16/8/30.
 */
import React,{Component,PropTypes} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  }
});
class SecondScreen extends Component{
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
module.exports = SecondScreen;