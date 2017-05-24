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

export default class ActorItem extends Component{
  
  render(){
    const {image, name, onPress} = this.props;
  
    return (
      <TouchableOpacity style={styles.actor} onPress={onPress}>
        <Image source={{ uri: image}}
               style={styles.actorImage}/>
        <View style={styles.actorInfo}>
          <Text>
            {name}[演员]
          </Text>
        </View>
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
  actorInfo:{
    marginTop:10,
  },
});