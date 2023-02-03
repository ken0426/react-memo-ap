import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import firebase from 'firebase';

const MemoCreateScreen = ({ navigation }: any) => {
  const [bodyText, setBodyText] = useState('');
  const handlePress = async () => {
    const { currentUser } = firebase.auth(); // ユーザー情報を取得
    const db = firebase.firestore();
    const ref = db.collection(`users/${currentUser?.uid}/memos`); // ユーザーごとにDBへ保存する。
    try {
      await ref.add({
        bodyText,
        updatedAt: new Date(), // 現在の時刻を追加
      });
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <KeyboardSafeView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setBodyText(text)}
          autoFocus // このページが表示されたときにキーボードを表示する
          value={bodyText}
          multiline={true}
          style={styles.input}
        />
      </View>
      <CircleButton name='check' onPress={handlePress} />
    </KeyboardSafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 32,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default MemoCreateScreen;
