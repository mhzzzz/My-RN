/**
 * Created by WangZH on 2017/5/17.
 */

import React , {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  AsyncStorage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import ActorItem from "../components/ActorItem";
import DirectorItem from "../components/DirectorItem";
import PlayImage from "../components/PlayImage";


const api = 'https://api.douban.com/v2/movie/subject';

export default class MyApp extends Component{
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });
  state = {
    data:{},
    ready:false,
    click:false,
    number:0,
    actors:[],
    //hasData:0,
  };
  //hasData:false;
  renderStars = (stars) =>{
    const total = 5;
    let full, half, empty;
    full = parseInt(stars[0])-1;
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
      
      </View>
    );
  };
  fetchData = async () =>{
   
    //this.hasData = true;
    const {state:{ params: { id } } } = this.props.navigation;
    let  jsonData;
    //textData = await AsyncStorage.getItem(id);
    //console.log(id);
    jsonData = await storage.load({
      key:'movie',
      id:id,
      syncInBackground:true,
    });
    // if(textData){
    //
    //   alert('数据来自本地');
    // }else {
    //   const rawData = await fetch(`${api}/${id}`);
    //   textData = await rawData.text();
    //   alert('数据来自服务器');
    //   jsonData = JSON.parse(textData);
    //   jsonData.image = jsonData.images.large.replace('webp', 'jpg');
    //   storage.save(
    //     {
    //       key:'movie',
    //       data:jsonData,
    //     }
    //   );
    // }
    jsonData.image = jsonData.images.large.replace('webp', 'jpg');
    this.setState({
      data:jsonData,
      ready:true,
      actors:jsonData.casts,
      directors:jsonData.directors,
    });
  };
  async componentDidMount(){
    await this.fetchData();
    //反序列化
    // jsonData = JSON.parse(textData);
    // jsonData.image = jsonData.images.large.replace('webp', 'jpg');
    //序列化
    //const
    //AsyncStorage.setItem(id, textData);
  }
  // reviewWatch = () =>{
  //   const {data:{reviews_count}, click, number} = this.state;
  //   let review = reviews_count;
  //   if(click){
  //     review -=1;
  //     this.setState({
  //       number:review,
  //       click:true,
  //     });
  //   }else{
  //     review +=1;
  //     this.setState({
  //       number:review,
  //       click:false,
  //     });
  //   }
  // };
  watch1 = () =>{
    const {data:{reviews_count}, click, number, } = this.state;
    this.setState({
      review_count:reviews_count +1,
    });
  };
  render(){
    const {data :
      {
        title,
        summary,
        image,
        year,
        rating,
        countries,
        genres,
        wish_count,
        reviews_count,
      }, ready, actors, directors} = this.state;
    const {navigate} = this.props.navigation;
    return(
      <ScrollView>
        
        {
          ready ?
            <View style={styles.root}>
              <View style={styles.top}>
                <Image source={{ uri:image }} style={styles.image}/>
                <View style={styles.introduct}>
                  <View style={styles.grade}>
                    {this.renderStars(rating.stars)}
                    <Text style={styles.gradeText}>{rating.average}分</Text>
                    <Text>{wish_count}人评分</Text>
                  </View>
                  <View style={styles.playTime}>
                    <Text>{year}/</Text>
                    <Text>123分钟(中国大陆)</Text>
                  </View>
                  <View style={styles.buy}>
                    <Text>{countries}</Text>
                    <Text>{genres[0]} {genres[1]} {genres[2]}</Text>
                    <TouchableOpacity style={styles.buyButton}>
                      <Text style={styles.buyText}>购票</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <View style={styles.wish_watch}>
                <TouchableOpacity style={styles.watchButton}>
                  <Text style={styles.watchText}>我想看</Text>
                  <Text style={styles.wishText}>({wish_count})</Text>
                
                </TouchableOpacity>
                <TouchableOpacity style={styles.watchButton}
                                  onPress={this.watch1}>
                  <Text style={styles.watchText}>我看过</Text>
                  <Text style={styles.reviewText}>({reviews_count})</Text>
                </TouchableOpacity>
              </View>
              
              
              <View style={styles.playImage}>
                
                <FlatList
                  horizontal={true}
                  data={actors}
                  keyExtractor={item => item.id}
                  renderItem={({item}) =>
                    <PlayImage
                      image={item.avatars.small}
                      onPress={() => navigate('Introduction', {
                        alt:item.alt,
                        title:item.name,
                      })}
                    />}
                />
              </View>
              <View style={styles.summary}>
                <Text numberOfLines={6} style={styles.summaryText}>{summary}</Text>
              </View>
              
              <View>
                <FlatList
                  data={directors}
                  keyExtractor={item => item.id}
                  renderItem={({item}) =>
                    <DirectorItem
                      image={item.avatars.small}
                      name={item.name}
                      onPress={() => navigate('Introduction', {
                        alt:item.alt,
                        title:item.name,
                      })}
                    />}
                />
              </View>
              <View>
                <FlatList
                  data={actors}
                  keyExtractor={item => item.id}
                  renderItem={({item}) =>
                    <ActorItem
                      image={item.avatars.small}
                      name={item.name}
                      onPress={() => navigate('Introduction', {
                        alt:item.alt,
                        title:item.name,
                      })}
                    />}
                />
              </View>
            </View>
            :
            <ActivityIndicator size="large" style={styles.loading}/>
        }
      
      
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  root:{
    backgroundColor:'#F4F4F4',
  },
  image:{
    width:100,
    height:100/0.697,
    margin:10,
  },
  loading:{
    marginTop:20,
  },
  top:{
    flexDirection:'row',
  },
  introduct:{
    marginTop:10,
  },
  grade:{
    paddingTop:6,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  gradeText:{
    paddingRight:7
  },
  playTime:{
    marginTop:9,
    flexDirection:'row',
    //justifyContent:'space-between',
  },
  buyButton:{
    borderRadius:5,
    marginTop:13,
    width:150,
    height:40,
    backgroundColor:'#2095D4',
  },
  buyText:{
    paddingTop:5,
    textAlign:'center',
    fontSize:18,
    color:'#fff',
  },
  wish_watch:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  watchButton:{
    borderRadius:5,
    marginVertical:7,
    width:150,
    height:40,
    backgroundColor:'#F8F8F8',
    borderColor:'#ccc',
    borderWidth:1,
    flexDirection:'row',
    justifyContent:'center',
  },
  watchText:{
    color:'#9A9A9A',
    paddingTop:5,
    //textAlign:'center',
    fontSize:18,
  },
  reviewText:{
    top:8,
    right:13,
    color:'#9A9A9A',
    paddingLeft:12,
  },
  wishText:{
    top:8,
    right:13,
    color:'#9A9A9A',
    paddingLeft:12,
  },
  playImage:{
    marginTop:3,
    backgroundColor:'#EBEBEB',
    height:100,
    marginHorizontal:10,
  },
  summary:{
    marginTop:3,
    backgroundColor:'#EBEBEB',
    marginHorizontal:10,
  },
  summaryText:{
    fontSize:17,
    paddingHorizontal:10,
    paddingVertical:15,
  },
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
  starsRow:{
    flexDirection:'row',
    alignItems:'center'
  },
  stars:{
    width:10,
    height:10,
  },
});