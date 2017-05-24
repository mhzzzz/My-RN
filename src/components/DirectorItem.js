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

export default class DirectorItem extends Component{
  
  render(){
    const {image, name, onPress} = this.props;
    
    return (
      <TouchableOpacity style={styles.director} onPress={onPress}>
        <Image source={{ uri:image }}
               style={styles.directorImage}/>
        <View style={styles.directorInfo}>
          <Text>
            {name}[导演]
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  director:{
    marginTop:3,
    flexDirection:'row',
    backgroundColor:'#EBEBEB',
    marginHorizontal:10,
  },
  directorImage:{
    width:50,
    height:50/0.697,
    margin:10
  },
  directorInfo:{
    marginTop:10,
  },
});