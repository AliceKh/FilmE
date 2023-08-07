import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ReactionRecording from './ReactionRecordingComponent';
import { stylesMedia } from '../styles/style';

const { height } = Dimensions.get('screen');
const width = height * 0.5625; // 16:9 aspect ratio


class VideoReactionPage extends React.Component {

  constructor(props){
    super(props);

    this.videoRef = React.createRef();
    this.state = {
      videoUrl: '',
      isPlaying: false,
      isLoading: true,
      isDialogVisible: false,
      videoFile: "",
      isFaceDetected: true,
    };

    const { navigation } = this.props;
    const video = navigation.state.params.selectedItem

    this.downloadFile(video);
  }

  componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }
    componentWillUnmount() {
        this.backHandler.remove()
    }
    handleBackButtonPressAndroid = () => {
        const { navigation } = this.props;
        if (navigation && navigation.navigate) {
          navigation.navigate('ExplorePage');
          return true;
        }
        // We have handled the back button
        // Return `false` to navigate to the previous screen
        return false;
    };
  
  downloadFile = async (video) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if(status != 'granted') {
        console.log("Permissions error");
        return;
    }

    try {
      fileUrl = FileSystem.cacheDirectory + video.Title + '.mp4';

      console.log("starting download");
      const downloadResumable = FileSystem.createDownloadResumable(video.LinkToStorage, fileUrl, {}, false);
      const { uri } = await downloadResumable.downloadAsync(null, {shouldCache: false});

      console.log("download completed");
      this.setState({videoFile: uri});
      this.setState({isLoading: false});
      this.handlePlayPause();
    }
    catch (err) {
        console.log(err);
    }
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

  handleFaceDetectionChange = (isFaceDetected) => {
    this.setState({ isFaceDetected });

    const video = this.videoRef.current;
    if (video) {
      if (isFaceDetected && this.state.isPlaying) {
        video.playAsync();
      } else {
        video.pauseAsync();
      }
    }
  };

  handleEndOfVideo = (status) => {
    if(status.didJustFinish) {
      this.setState({isPlaying: false});
      this.videoRef.current.unloadAsync();
      Alert.alert('Thank You!', 'Your reaction received', [{text: 'OK', onPress: () => this.props.navigation.navigate('ExplorePage')}]);
    }
  }

  render() {
    const {isPlaying, isFaceDetected } = this.state;
    const { navigation } = this.props;
    const item = navigation.state.params.selectedItem

    return (
      <View style={stylesMedia.container}>
        {this.state.isLoading ?
          <View style={{paddingTop: height/2}}>
              <ActivityIndicator size="large" color="#9960D2" /> 
          </View>
          :
          <Video
          ref={this.videoRef}
          source={{uri: this.state.videoFile}}
          style={stylesMedia.backgroundVideo}
          resizeMode="contain"
          shouldPlay={this.state.isPlaying}
          isLooping={false}
          onPlaybackStatusUpdate={(status) => this.handleEndOfVideo(status)}
        />     
        }   
        <View style={stylesMedia.overlay}>
          <Text style={stylesMedia.title}>{item.Title}</Text>
          <Text style={stylesMedia.artist}>{item.Uploader.Username}</Text>
          <View style={stylesMedia.controls}>
          <TouchableOpacity onPress={this.handlePlayPause}>
          {isPlaying ?
                <Image source={require('../images/pause.png')} style={stylesMedia.controlButton} />
                :
                <Image source={require('../images/play.png')} style={stylesMedia.controlButton} />
              }
          </TouchableOpacity>
        </View>
        </View>
        <ReactionRecording isPlaying={this.state.isPlaying} 
                               uploaderId={item.Uploader._id}
                               mediaId={item._id}
                               onFaceDetectionChange={this.handleFaceDetectionChange} 
                               >
                        
        </ReactionRecording>
        <Modal visible={!isFaceDetected} animationType="slide" transparent={true}>
          <View style={stylesMedia.dialogContainer}>
            <View style={stylesMedia.dialogContent}>
              <Image source={require('../images/inFrame.png')} style={stylesMedia.dialogImage} />
              <Text style={stylesMedia.dialogText}>You're Not in Frame</Text>
              <Text style={stylesMedia.paraText}>Please adjust your position so that your face is centered within the square on the screen for optimal facial recognition.</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default VideoReactionPage;