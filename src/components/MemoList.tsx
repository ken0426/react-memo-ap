import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from 'react-native';
import { MemosType } from '../types';
import { dateToString } from '../utils';
import firebase from 'firebase';

interface itemData {
  item: MemosType;
}

const MemoList = ({ navigation, memos }: any) => {
  const renderItem = ({ item }: itemData) => {
    const deleteMemo = (id: string) => {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        const db = firebase.firestore();
        const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
        Alert.alert('メモを削除します', 'よろしいですか？', [
          {
            text: 'キャンセル',
            onPress: () => {},
          },
          {
            text: '削除する',
            style: 'destructive', // iOS限定で文字が赤色になる
            onPress: () => {
              try {
                ref.delete();
              } catch {
                Alert.alert('削除に失敗しました');
              }
            },
          },
        ]);
      }
    };

    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          navigation.navigate('MemoDetail', { id: item.id });
        }}
        style={styles.memoListItem}
      >
        <View style={styles.memoInner}>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>
            {item.bodyText}
          </Text>
          <Text style={styles.memoListItemDate}>
            {dateToString(item.updatedAt)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => deleteMemo(item.id)}
        >
          <Feather name={'x'} size={16} color='#B0B0B0' />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0, 0.15)',
  },
  memoInner: {
    flex: 1,
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});

export default MemoList;
