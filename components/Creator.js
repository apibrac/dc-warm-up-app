import React from 'react';
import { StyleSheet, Text, View, Image, PanResponder, Animated,  Button } from 'react-native';
import Expo from 'expo';
import config from '../config';
const { SERVER_ENDPOINT } = config;

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
      })
      .then(uri=>{
        // Create the form data object
        var data = new FormData();
        data.append('picture', {uri, name: 'screenhot.jpg', type: 'image/jpg'});

        // Create the config object for the POST
        // You typically have an OAuth2 token that you use for authentication
        const config = {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data;',
         },
         body: data,
        }

        console.log(SERVER_ENDPOINT)
        fetch(SERVER_ENDPOINT, config)
         .then((responseData) => {
             // Log the response form the server
             // Here we get what we sent to Postman back
             console.log(responseData);
         })
         .catch(err => {
           console.log(err);
         })
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
