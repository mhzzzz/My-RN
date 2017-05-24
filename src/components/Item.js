/**
 * Created by WangZH on 2017/5/14.
 */

import React , {Component} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} =Dimensions.get('window');
const thirdWidth = width/3;

const imgWidth=thirdWidth-12;

const imgHeight=imgWidth/0.697;

const styles=StyleSheet.create({
    root:{
      marginTop:20,
      width:imgWidth,
      marginLeft:9,
    },
    img:{
      width:imgWidth,
      height:imgHeight,
    },
    title:{
      paddingTop:5,
      fontSize:16,
      textAlign:'center',
    },
  stars:{
    width:10,
    height:10,
  },
  starsRow:{
      marginTop:5,
      flexDirection:'row',
    alignItems:'center'
  },
  average:{
      paddingLeft:5,
    color:'#F67A5C'
  },
  averageText:{
      marginTop:5,
    fontSize:12,
    textAlign:'center',
  }
});

const renderStars = (stars, average) =>{
  const total = 5;
  let full, half, empty, averageNum;
  full = parseInt(stars[0])-1;
  averageNum = average;
  if(stars[1] === '5'){
    full += 1;
    half = 0;
    empty = total - full - half;
  }else{
    if(stars !== '00'){
      half = 1;
      empty = total - full - half;
    }else {
     half = 0;
     empty = 5;
    }
  }
  const results = [];
  let i;
  for( i = 0; i<full; i++){
    results.push(<Image
      key={i}
      source={require('../img/star-full.png')}
      style={styles.stars}
    /> )
  }
  if(half){
    i++;
    results.push( <Image
      key={i}
      source={require('../img/star-half.png')}
      style={styles.stars}
    /> )
  }
  for(let j=1; j<=empty; j++){
    results.push(<Image
      key={i+j}
      source={require('../img/star-empty.png')}
      style={styles.stars}
    /> )
  }
  
  return (
    <View style={styles.starsRow}>
      {results}
      <Text style={styles.average}>
        {averageNum}
      </Text>
    </View>
  );
};

const Item = (props) => {
  const {image, title, stars, average, onPress} = props;
  return(
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image
        source={{uri:image}}
        style={styles.img}
      />
      <Text
        numberOfLines={1}
        style={styles.title}
      >
        {title}
      </Text>
        {
            average ?
              renderStars(stars, average)
              :
              <Text style={styles.averageText}>暂无评分</Text>
        }
    </TouchableOpacity>
  );
};

export default Item

// export default class Item extends Component{
//   render(){
//     const {image, title} = this.props;
//     return(
//       <View style={styles.root}>
//         <Image
//           source={{uri:image}}
//           style={styles.img}
//         />
//         <Text
//           numberOfLines={1}
//           style={styles.title}
//         >
//           {title}
//         </Text>
//
//       </View>
//     );
//   }
// }