import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Video } from 'expo-av';
import * as firebase from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from './config'

const { height } = Dimensions.get('window');
const width = height * 0.5625; // 16:9 aspect ratio

firebase.initializeApp(firebaseConfig);

class VideoReactionPage extends React.Component {

  constructor(props){
    super(props);

    this.videoRef = React.createRef();
    this.state = {
      videoUrl: null,
      isPlaying: true
    };
  }
  

  componentDidMount() {
    const storage = getStorage();
    const videoRef = ref(storage, 'video/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764.mp4');

    getDownloadURL(videoRef)
      .then(url => {
        this.setState({ videoUrl: url });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handlePlayPause = () => {
    const { isPlaying } = this.state;
    const video = this.videoRef.current;

    if (isPlaying) {
      video.pauseAsync();
    } else {
      video.playAsync();
    }

    this.setState({ isPlaying: !isPlaying });
  };

  render() {
    const { videoUrl, isPlaying } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../images/previous.png')} 
                       style={{ width: 20, height: 20, color: 'white' }} />
            </TouchableOpacity> 
            <TouchableOpacity onPress={this.toggleMenu}>
            <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <Video
          ref={this.videoRef}
          source={{uri: videoUrl}}
          style={styles.backgroundVideo}
          resizeMode="contain"
          shouldPlay={isPlaying}
          isLooping={true}
          onReadyForDisplay={videoData => {
            videoData.srcElement.style.position = "initial"
          }}
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>Song Title</Text>
          <Text style={styles.artist}>Artist Name</Text>
          <View style={styles.controls}>
          <TouchableOpacity>
            <Image source={require('../images/shuffle.png')} style={styles.controlButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/prev.png')} style={styles.controlButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handlePlayPause}>
          {isPlaying ?
                <Image source={require('../images/pause.png')} style={styles.controlButton} />
                :
                <Image source={require('../images/play.png')} style={styles.controlButton} />
              }
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/next.png')} style={styles.controlButton} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../images/loop.png')} style={styles.controlButton} />
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: height,
    width: width,
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    color: 'white',
    fontSize: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  controlButton: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});

export default VideoReactionPage;
