/**
 * Created by WangZH on 2017/5/19.
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
  WebView,
} from 'react-native';

export default class Introduction extends Component{
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
  });
  state = {
    ready:false,
  };
  onLoadStart = () =>{
    
    return (
        <View>
          <ActivityIndicator size="large"/>
        </View>
    )
  };
  onLoad = () =>{
    return (
      <View>
        <Text>加载完毕</Text>
      </View>
    )
  };
  render() {
    const {state:{ params: { alt } } } = this.props.navigation;
    
    return (
      <View style={styles.root}>
        
        <WebView
          source={{uri:alt}}
          style={styles.webView}
          onLoadStart={this.onLoadStart}
          onLoad={this.onLoad}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root:{
    flex:1
  },
  webView: {
    margin:5,
    backgroundColor:'#fff',
    height: 350,
  },
});