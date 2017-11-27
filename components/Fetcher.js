import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';

const SERVER_ENDPOINT = "http://192.168.0.12:3000/";

const Creation = () => <Text>Création</Text>

export default class App extends React.Component {
  state = {
    result: null,
  };

  componentDidMount() {
    this._fetchExampleAsync();
  }

  _fetchExampleAsync = async () => {
    try {
      let response = await fetch(SERVER_ENDPOINT);
      let result = await response.json();
      this.setState({result});
    } catch(e) {
      this.setState({result: e});
    }
  };

  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path="/" render={() => (
            <View>
              <Text>Welcome</Text>
              <Link to="/creation">
                <Text>Create</Text>
              </Link>
            </View>
          )} />
          <Route path="/creation" component={Creation}/>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
