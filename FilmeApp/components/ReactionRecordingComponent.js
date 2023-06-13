import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { sendReactions } from '../services/ReactionsService';

export default function ReactionRecording(props) {
    
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();
    const [reactionsArray, setReactionsArray] = useState([]);
    const intervalId = useRef();

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
      var intervalValue;  
      const reactions = [];   
      if(props.isPlaying) {
        if(intervalId.current == null) {
          setReactionsArray([]);
          intervalValue = setInterval(() => {
            let result = camera.takePictureAsync()
              .then((res) => {
                  let encodedPicture = FileSystem.readAsStringAsync(res.uri, {encoding: 'base64'})
                    .then((encoded) => {
                      return encoded;
                    });

                    return encodedPicture;
              })
              .catch(err => console.log(err));

              reactions.push(result);
              setReactionsArray(reactions);
              console.log(reactions.length);
            }, 
          3000);

          intervalId.current = intervalValue;
        }
      }
      else {
        clearInterval(intervalId.current);
        intervalId.current = null;
        sendReactions(reactionsArray);
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
