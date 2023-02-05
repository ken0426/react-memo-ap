import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Button from '../components/Button';

import firebase from 'firebase';
import { translateErrors } from '../utils';

const SingUpScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlePress = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'MemoList',
          },
        ],
      });
    } catch (error: any) {
      const errorMsg = translateErrors(error.code);
      Alert.alert(errorMsg.title, errorMsg.description);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sing Up</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize='none' // 英語入力の時、最初の文字が大文字にならない設定
          keyboardType='email-address' // キーボードがメールアドレスのキーボードに変化
          placeholder='メールアドレス'
          textContentType='emailAddress' // iOSの場合「キーチェーン」にメールアドレスが登録されている場合自動的に持ってくることが可能
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          autoCapitalize='none' // 英語入力の時、最初の文字が大文字にならない設定
          placeholder='パスワード'
          secureTextEntry
          textContentType='password' // iOSの場合「キーチェーン」にパスワードが登録されている場合自動的に持ってくることが可能
        />
        <Button label={'Submit'} onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          >
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#dddddd',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },

  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467fd3',
  },
  footer: {
    flexDirection: 'row',
  },
});

export default SingUpScreen;
