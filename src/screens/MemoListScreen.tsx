import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';
import MemoList from '../components/MemoList';

const MemoListScreen = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <MemoList />
      <CircleButton icon={'+'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});

export default MemoListScreen;
