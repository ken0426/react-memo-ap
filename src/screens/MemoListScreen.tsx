import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import firebase from 'firebase';
import { MemosType } from '../types';

const MemoListScreen = ({ navigation }: any) => {
  const [memos, setMemos] = useState<MemosType[]>([]);
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
          .orderBy('updatedAt', 'desc'); // 新しいものが一番上に来るようにレスポンスを貰えるようにするため「desc」を追加。
        unsubscribe = ref.onSnapshot((snapshot) => {
          const userMemos: MemosType[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            userMemos.push({
              id: doc.id,
              bodyText: data.bodyText,
              updatedAt: data.updatedAt.toDate(), // タイムスタンプ型を日付に変更
            });
          });
          setMemos(userMemos);
        });
      } catch (error) {
        Alert.alert('データの読み込みに失敗しました。');
      }
    }
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <MemoList navigation={navigation} memos={memos} />
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
