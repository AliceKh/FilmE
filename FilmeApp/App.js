import { StatusBar } from 'expo-status-bar';
import AppNavigator from './Navigator';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  global.server="192.168.1.247";
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
