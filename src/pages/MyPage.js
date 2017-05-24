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
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';


export default class MyApp extends Component{
  static navigationOptions = {
    title: '我的影院',
  };
  clearData =() => {
    AsyncStorage.clear();
    
  };
  render(){
    return(
      <View style={styles.root}>
        <Text>我的影院</Text>
        <TouchableOpacity onPress={this.clearData} style={styles.clear}>
          <Text >
            删除本地缓存......
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root:{
  
  },
  clear:{
    width:150,
    height:50,
    borderWidth:1,
    borderRadius:5,
  }
});