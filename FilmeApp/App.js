import { StatusBar } from 'expo-status-bar';
import AppNavigator from './Navigator';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  global.server="10.10.192.134";
  console.log(global.server);
  return (
    <AppNavigator/>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
