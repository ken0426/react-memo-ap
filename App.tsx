import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <View style={styles.appBarInner}>
          <Text style={styles.appBarTitle}>Memo App</Text>
          <Text style={styles.appBarRight}>ログアウト</Text>
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
    backgroundColor: '#F0F4F8',
  },
  appBar: {
    width: '100%',
    height: 104,
    backgroundColor: '#467FD3',
    justifyContent: 'flex-end',
  },
  appBarInner: {
    alignItems: 'center',
  },
  appBarRight: {
    position: 'absolute',
    right: 19,
    bottom: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  appBarTitle: {
    marginBottom: 8,
    fontSize: 22,
    lineHeight: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
