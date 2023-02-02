import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';
import firebase from 'firebase';

const MemoCreateScreen = ({ navigation }: any) => {
  const handlePress = async () => {
    const db = firebase.firestore();
    const ref = db.collection('memos');
    try {
      const docRef = await ref.add({
        bodyText: 'Hello',
      });
      console.log('Created!', docRef.id);
      navigation.goBack();
    } catch (error) {
      console.log('Error', error);
    }
  };

  return (
    <KeyboardSafeView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput value='' multiline={true} style={styles.input} />
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
