import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Memo App</Text>
          <Text>ログアウト</Text>
        </View>
      </View>

      {/* ------------ ここからリスト ------------ */}
      <View>
        <View>
          <View>
            <Text>買い物リスト</Text>
          </View>
          <View>
            <Text>2020年12月24日 10:00</Text>
          </View>
        </View>
        <View>
          <Text>✗</Text>
        </View>
      </View>
      {/* ------------ ここまでリスト ------------ */}

      {/* ------------ 新規登録ボタン ------------ */}
      <View>
        <Text>+</Text>
      </View>

      {/* eslint-disable */}
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
