import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import firebase from 'firebase';

const MemoListScreen = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton navigation={navigation} />,
    });
  }, []);

  // データベースからリストのデータを受け取る処理
  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      try {
        const ref = db
          .collection(`users/${currentUser?.uid}/memos`)
          .orderBy('updateAt', 'desc'); // 新しいものが一番上に来るようにレスポンスを貰えるようにするため「desc」を追加。
        unsubscribe = ref.onSnapshot((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
          });
        });
      } catch (error) {
        Alert.alert('データの読み込みに失敗しました。');
        return console.log(error);
      }
    }
    return unsubscribe;
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
