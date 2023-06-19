import { Camera, CameraType } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { sendReactions } from '../services/ReactionsService';
import * as FaceDetector from 'expo-face-detector'

export default function ReactionRecording(props) {
    
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();
    const [reactionsArray, setReactionsArray] = useState([]);
    const [initTime, setInitTime] = useState(Date.now());
    const intervalId = useRef();
    const [isFaceDetected, setIsFaceDetected] = useState(false);

    const handleFacesDetected = ({ faces }) => {
      const faceDetected = faces.length > 0;
      setIsFaceDetected(faceDetected);
      props.onFaceDetectionChange(faceDetected);
    };

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
          intervalValue = setInterval(async () => {
            let time = Date.now();
            let result = await camera.takePictureAsync();

              //let encodedPicture = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'})
              // reactions.push(encodedPicture);
              // setReactionsArray(reactions);

            let pictureTime = (time - initTime)/1000;
            sendReactions(result.uri, pictureTime, props.mediaId);
          }, 
          7000);

          intervalId.current = intervalValue;
        }
      }
      else {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }
  
    return (
    <View style={styles.container}>
        <Camera style={styles.camera}
                type={CameraType.front}
                ref={(camera) => setCamera(camera)}
                faceDetectorSettings={{
                  mode: FaceDetector.FaceDetectorMode.fast,
                  detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                  runClassifications: FaceDetector.FaceDetectorClassifications.none,
                  minDetectionInterval: 1000,
                  tracking: true,
                }}
                onFacesDetected={handleFacesDetected}>
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
