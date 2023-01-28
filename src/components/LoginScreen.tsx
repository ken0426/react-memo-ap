import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppBar from './AppBar';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View>
        <Text>Login</Text>
        <TextInput value='Email Address' />
        <TextInput value='Password' />
        <View>
          <Text>Submit</Text>
        </View>
        <View>
          <Text>Not registered?</Text>
          <Text>Sign up Here!</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LoginScreen;
