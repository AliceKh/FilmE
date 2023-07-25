import { StatusBar } from 'expo-status-bar';
import AppNavigator from './Navigator';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function App() {
  global.server="192.168.1.10";
  return (
    <AppNavigator/>
  );
}
