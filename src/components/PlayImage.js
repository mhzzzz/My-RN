/**
 * Created by WangZH on 2017/5/19.
 */
/**
 * Created by WangZH on 2017/5/19.
 */
import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default class PlayImage extends Component{
  
  render(){
    const {image, name, onPress} = this.props;
    
    return (
      <TouchableOpacity style={styles.actor} onPress={onPress}>
        <Image source={{ uri: image}}
               style={styles.actorImage}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  actor:{
    marginTop:3,
    flexDirection:'row',
    backgroundColor:'#EBEBEB',
    marginHorizontal:10,
  },
  actorImage:{
    width:50,
    height:50/0.697,
    margin:10
  },
});