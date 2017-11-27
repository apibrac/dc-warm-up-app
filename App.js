import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import Creator from './components/Creator';

export default () =>
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
      <Route path="/creation" component={Creator}/>
    </View>
  </NativeRouter>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
