import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function ScreenA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen A</Text>
    </View>
  );
}

function ScreenB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen B</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export { ScreenA, ScreenB };