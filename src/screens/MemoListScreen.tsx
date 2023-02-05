import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import firebase from 'firebase';
import { MemosType } from '../types';
import Button from '../components/Button';
import Loading from '../components/Loading';

const MemoListScreen = ({ navigation }: any) => {
  const [memos, setMemos] = useState<MemosType[]>([]);
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
    return unsubscribe;
  }, []);

  if (memos.length === 0) {
    return (
      <View style={emptyStyles.container}>
        <Loading isLoading={loading} />
        <View style={emptyStyles.inner}>
          <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
          <Button
            style={emptyStyles.button}
            label='作成する'
            onPress={() => {
              navigation.navigate('MemoCreate');
            }}
          />
        </View>
      </View>
    );
  } else {
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
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});

const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});

export default MemoListScreen;
