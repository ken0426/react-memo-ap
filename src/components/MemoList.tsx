import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { MemosType } from '../types';

const MemoList = ({ navigation, memos }: any) => {
  return (
    <View>
      {memos.map((memo: MemosType) => {
        return (
          <TouchableOpacity
            key={memo.id}
            onPress={() => {
              navigation.navigate('MemoDetail');
            }}
            style={styles.memoListItem}
          >
            <View>
              <Text style={styles.memoListItemTitle}>{memo.bodyText}</Text>
              <Text style={styles.memoListItemDate}>
                {String(memo.updatedAt)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.memoDelete}
              onPress={() => {
                Alert.alert('このリストを削除しますか？');
              }}
            >
              <Feather name={'x'} size={16} color='#B0B0B0' />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
