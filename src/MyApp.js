/**
 * Created by WangZH on 2017/5/13.
 */
import React from 'react';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';

import List from './pages/List';
import Detail from './pages/Detail';
import Introduction from './pages/Introduction';
import DetailCopy from './pages/DetailCopy';

import MyPage from './pages/MyPage';
import Cinema from './pages/Cinema';


const MyTab = TabNavigator({
  List:{screen: List},
  Cinema:{screen: Cinema},
  MyPage:{screen: MyPage},
  }, {
    tabBarPosition:'bottom',
    tabBarOptions: {
    activeTintColor: '#0390eb',
    inactiveTintColor:'#fff',
    labelStyle: {
      fontSize: 20,
      marginTop:10,
    },
    style: {
      backgroundColor: '#222',
    },
  }
});

const MyApp = StackNavigator(
  {
    MyTab:{screen: MyTab},
  //Detail: {screen: Detail},
    DetailCopy:{screen: DetailCopy},
    Introduction:{screen: Introduction},
  },{
  headerMode:'screen',
  }
);

export default MyApp;