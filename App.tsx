import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from 'firebase';

import LoginScreen from './src/screens/LoginScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import SingUpScreen from './src/screens/SingUpScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoListScreen from './src/screens/MemoListScreen';
import { firebaseConfig } from './env';

const Stack = createNativeStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SingUP'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#467fd3',
          },
          headerTitleStyle: { color: '#ffffff' },
          headerTitle: 'Memo App',
          headerTintColor: '#ffffff',
          headerBackTitle: 'Back',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name='MemoList' component={MemoListScreen} />
        <Stack.Screen name='MemoDetail' component={MemoDetailScreen} />
        <Stack.Screen name='MemoEdit' component={MemoEditScreen} />
        <Stack.Screen name='MemoCreate' component={MemoCreateScreen} />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name='SingUP'
          component={SingUpScreen}
          options={{
            presentation: 'fullScreenModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
