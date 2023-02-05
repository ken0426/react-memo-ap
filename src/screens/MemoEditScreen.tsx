import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Alert } from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import firebase from 'firebase';

const MemoEditScreen = ({ navigation, route }: any) => {
  const { id, bodyText } = route.params;

  const [body, setBody] = useState(bodyText);

  // メモを更新するロジック
  const handlePress = () => {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      try {
        ref.set(
          {
            bodyText: body,
            updatedAt: new Date(),
          },
          { merge: true } // 今回は不要だが、登録日は更新をかけたくない場合はmerge: trueをつけることで登録日は更新をかけないようできる
        );
        navigation.goBack();
      } catch (error) {
        Alert.alert('接続エラーが発生しました');
      }
    }
  };
  return (
    <KeyboardSafeView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput
          value={body}
          onChangeText={(text) => setBody(text)}
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 27,
  },
});

export default MemoEditScreen;
