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
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import Item from '../components/Item';

const styles=StyleSheet.create({
  row:{
    //paddingHorizontal:9,
  },
  loadingLogo:{
    marginTop:20,
  },
  loadingText:{
    textAlign:'center',
    fontSize:20,
  },
  hotText:{
    fontSize:22,
    textAlign:'center',
  },
});

const api = 'https://api.douban.com/v2/movie/in_theaters';

export default class List extends Component{
  static navigationOptions = {
    title: '列表页',
    header:null,
  };
  state = {
    //movies:movies.subjects,
    movies:[],
    refreshing:false,
    ready:false,
    childState:'',
  };
  start = 0;
  count = 9;
  refreshFlag = false;
  fetchData = (start = 0, count = 9) => {
    if(this.refreshFlag){
      return;
    }
    this.setState({
      refreshing:true,
    });
    this.refreshFlag = true;
    
    return fetch(`${api}?start=${start}&count=${count}`)
      .then((response) => response.text())
      .then((responseText) => {
        const json = JSON.parse(responseText);
        this.setState({
          //movies:json.subjects,
          refreshing:false,
        });
        this.refreshFlag=false;
        return json;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  freshData = async () =>{
    const json = await this.fetchData();
    this.setState({
      movies:json.subjects,
    });
  };
  fetchMore = async () =>{
    const json = await this.fetchData(this.start, this.count);
    if(json){
      this.start += this.count;
      this.setState({
        movies:this.state.movies.concat(json.subjects),
      });
    }
  };
  async componentDidMount(){
    await this.fetchMore();
    this.setState({
      ready:true,
    });
  }
  
  render(){
    const {movies, refreshing, ready, childState} = this.state;
    const { navigate } = this.props.navigation;
    return(
    
      <View>
        <Text style={styles.hotText}>正在热映</Text>
        {
          ready ?
            <FlatList
              style={styles.row}
              onRefresh={this.freshData}
              onEndReached={this.fetchMore}
              onEndReachedThreshold={0.01}
              refreshing={refreshing}
              numColumns={3}
              keyExtractor={item => item.id}
              data={movies}
              renderItem={({item})=>{
                return (
                  <Item
                    image={item.images.medium}
                    title={item.title}
                    stars={item.rating.stars}
                    average={item.rating.average}
                    onPress={() => navigate('DetailCopy',
                      {
                        id:item.id,
                        title:item.title,
                      })}
                  />
                )
              }}
            />
            :
            <View style={styles.loadingLogo}>
              <ActivityIndicator size={40}/>
              <Text style={styles.loadingText}>
                loading...
              </Text>
            </View>
        }
      </View>
    )
  }
}