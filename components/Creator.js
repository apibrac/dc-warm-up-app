import React from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated,  Button } from 'react-native';
import Expo from 'expo';

export default () =>
  <View>
    <Text>Lets create</Text>
    <Snapshoter/>
  </View>

class Snapshoter extends React.Component{
  handleScreenshot = () => {
    if(this.refs && this.refs.content)
      Expo.takeSnapshotAsync(this.refs.content, {
        format: "png",
        quality: 1,
        result: 'file',
        height: 100,
        width: 100,
      });
  }

  render(){
    return (
      <View>
        <Button title="Scrine !" onPress={this.handleScreenshot}/>
        <View collapsable={false} ref="content">
          <Dragger/>
        </View>
      </View>
    )
  }
}

class Dragger extends React.Component{
  state = {pan: new Animated.ValueXY()}

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null,{
        dx : this.state.pan.x,
        dy : this.state.pan.y
      }]),
    });
  }

  render() {
    return (
      <Animated.View {...this._panResponder.panHandlers} style={this.state.pan.getLayout()}>
        <Image source={require('../img/ligue_des_champions.jpg')}/>
      </Animated.View>
    );
  }
}
