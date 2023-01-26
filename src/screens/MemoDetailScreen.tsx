import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AppBar from '../components/AppBar';
import CircleButton from '../components/CircleButton';

const MemoDetailScreen = () => {
  return (
    <View>
      <AppBar />
      <View>
        <Text>買い物リスト</Text>
        <Text>2023年1月26日</Text>
      </View>
      <ScrollView>
        <Text>
          買い物リスト 書体やレイアウトなどを確認するために用意ます。
          本文用なので使い方を間違えると不自然に見えることもありますので要注意。
        </Text>
      </ScrollView>
      <CircleButton icon={'+'}></CircleButton>
    </View>
  );
};

export default MemoDetailScreen;
