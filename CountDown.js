/**
 * Created by WangZH on 2017/5/9.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

class CountDown extends Component{
    state={
        count:10,
    }
    childAddTime=(time)=>{
       // const {count} = this.state;
        this.setState({
            count:this.state.count+time,
        })
    }
    timeup=()=>{
        alert('time is up');
        this.props.timeupPar && this.props.timeupPar();
    }
    componentWillMount(){
        this.timer=setInterval(()=>{
            const {count} = this.state;
            if(count === 0){
                this.timeup();
                return clearInterval(this.timer);
            }
            this.setState({
                count:count-1,
            })
        }, 1000)
    }
    render(){
        const {count} =this.state;
        return(
                <Text>
                    {count}
                </Text>
        )
    }
    componentWillUnmount(){
        clearInterval(this.timer)
    }
}

class App extends Component{
    addTime=()=>{
        this.countDown.childAddTime(10);
    }
    timeupPar=()=>{
        console.log('parent knows');
    }
    render(){
        return(
            <View>
                <TouchableOpacity onPress={this.addTime}>
                    <Text>
                        add 10 seconds
                    </Text>
                </TouchableOpacity>
                <CountDown
                    ref={countDown=>this.countDown=countDown}
                    timeupPar={this.timeupPar}
                />
            </View>
        )
    }
}
AppRegistry.registerComponent('App', ()=>App)
