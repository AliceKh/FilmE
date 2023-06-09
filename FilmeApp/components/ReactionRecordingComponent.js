import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { sendReactions } from '../services/ReactionsService';

export default function ReactionRecording(props) {
    
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();

    if (!permission) {
    // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
    // Camera permissions are not granted yet
        return (
            <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    if(camera) {
      var interval;

      if(props.isPlaying) {
        var reactions = [];
        interval = setInterval(() => {
          camera.takePictureAsync()
            .then((res) => {
                FileSystem.readAsStringAsync(res.uri, {encoding: 'base64'})
                  .then((encoded) => reactions.push(encoded));
            })
            .catch(err => console.log(err))}, 
        3000);
      }
      else if(interval) {
        clearInterval(interval);
        sendReactions(reactions);
      }
    }
  
    return (
    <View style={styles.container}>
        <Camera style={styles.camera} type={CameraType.front} ref={(camera) => setCamera(camera)}>
        </Camera>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    height:1,
    width:1,
    alignItems:'flex-end'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  }
});
