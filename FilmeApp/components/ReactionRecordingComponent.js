import { Camera, CameraType } from 'expo-camera';
import { useRef, useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { sendReactions } from '../services/ReactionsService';

export default function ReactionRecording(props) {
    
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [camera, setCamera] = useState();
    //const [reactionsArray, setReactionsArray] = useState([]);
    const [counter, setCounter] = useState(1);
    const intervalId = useRef();

    const intervalDuration = 4000; //milliseconds

    useEffect(() => {
      if(camera) { 
        var intervalValue;  
        //const reactions = [];   
        if(props.isPlaying) {
          if(intervalId.current == null) {
            //setReactionsArray([]);
            intervalValue = setInterval(async () => {
              let result = await camera.takePictureAsync();
  
              //let encodedPicture = await FileSystem.readAsStringAsync(result.uri, {encoding: 'base64'})
              // reactions.push(encodedPicture);
              // setReactionsArray(reactions);
  
              setCounter(counter + 1);
              let pictureTime = (counter * intervalDuration)/1000;
              console.log("counter: " + counter + " time: " + pictureTime);
              sendReactions(result.uri, pictureTime, props.mediaId);
            }, 
            intervalDuration);
  
            intervalId.current = intervalValue;
          }
        }
      }
      return () => {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }, [camera, counter, props.isPlaying]);

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
