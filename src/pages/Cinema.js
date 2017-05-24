/**
 * Created by WangZH on 2017/5/17.
 */
/**
 * Created by WangZH on 2017/5/17.
 */
/**
 * Created by WangZH on 2017/5/13.
 */
import React , {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';



const styles=StyleSheet.create({

});

export default class MyApp extends Component{
  static navigationOptions = {
    title: '影院页',
  };
  render(){
    const {state, goBack} = this.props.navigation;
    return(
      <View>
        <Text>影院页</Text>
        
      </View>
    )
  }
}