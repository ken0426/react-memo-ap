import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import CircleButton from '../components/CircleButton';
import KeyboardSafeView from '../components/KeyboardSafeView';

const MemoCreateScreen = () => {
  return (
    <KeyboardSafeView style={styles.container} behavior='height'>
      <View style={styles.inputContainer}>
        <TextInput value='' multiline={true} style={styles.input} />
      </View>
      <CircleButton name='check' />
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
