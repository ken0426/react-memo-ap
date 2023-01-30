import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';

const MemoListScreen = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton navigation={navigation} />,
    });
  }, []);
  return (
    <View style={styles.container}>
      <MemoList navigation={navigation} />
      <CircleButton
        name={'plus'}
        onPress={() => {
          navigation.navigate('MemoCreate');
        }}
      />
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
