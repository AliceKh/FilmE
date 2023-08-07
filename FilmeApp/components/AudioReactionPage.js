import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image, Modal, ActivityIndicator, BackHandler, Alert } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ReactionRecording from './ReactionRecordingComponent';
import { stylesMedia } from '../styles/style';

const { height } = Dimensions.get('screen');
const width = height * 0.5625; // 16:9 aspect ratio

class AudioReactionPage extends React.Component {

    constructor(props){
        super(props);

        this.sound = React.createRef();
        this.sound.current = new Audio.Sound();

        this.videoRef = React.createRef();
        this.state = {
            isPlaying: false,
            isLoading: true,
            audioFile: "",
            isDialogVisible: false,
            isFaceDetected: true
        };

        const { navigation } = this.props;
        const audio = navigation.state.params.selectedItem;

        this.downloadFile(audio);
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }
    componentWillUnmount() {
        if(this.sound.current){
            this.sound.current.stopAsync();
        }

        this.backHandler.remove()
    }
    handleBackButtonPressAndroid = () => {
        const { navigation } = this.props;

        if(this.sound.current)
            this.sound.current.stopAsync();
    
        if (navigation && navigation.navigate) {
          navigation.navigate('ExplorePage');
          return true;
        }
        // We have handled the back button
        // Return `false` to navigate to the previous screen
        return false;
    };

    downloadFile = async (audio) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if(status != 'granted') {
            return;
        }

        try {
            fileUrl = FileSystem.cacheDirectory + audio.Title + '.mp3';

            console.log("starting download");
            const downloadResumable = FileSystem.createDownloadResumable(audio.LinkToStorage, fileUrl, {}, false);
            const { uri } = await downloadResumable.downloadAsync(null, {shouldCache: false});

            console.log("download completed");
            this.setState({audioFile: uri});
            this.playSound();
        }
        catch (err) {
            console.log(err);
        }
    }

    playSound = async () => {
        this.sound.current.setOnPlaybackStatusUpdate((status) => {
            if(status.didJustFinish) {
                this.setState({ isPlaying: false });
                Alert.alert('Thank You!', 'Your reaction received', [{text: 'OK', onPress: () => this.props.navigation.navigate('ExplorePage')}]);
            }
        });

        await this.sound.current.loadAsync({
            uri: this.state.audioFile
        })

        await this.sound.current.playAsync();
        this.setState({isLoading: false});
        this.setState({ isPlaying: true });
    }

    handlePlayPause = () => {
        const { isPlaying } = this.state;
        const video = this.videoRef.current;

        if (isPlaying) {
            this.sound.current.pauseAsync();
            video.pauseAsync();
        } else {
            this.sound.current.playAsync();
            video.playAsync();
        }


        this.setState({ isPlaying: !isPlaying });
    };

    handleFaceDetectionChange = (isFaceDetected) => {
        const sound = this.sound.current;
        this.setState({ isFaceDetected });

        const video = this.videoRef.current;
        if (video) {
          if (isFaceDetected && this.state.isPlaying) {
            sound.playAsync();
            video.playAsync();            
          } else {
            sound.pauseAsync();
            video.pauseAsync();
          }
        }
    };

    render() {
        const { isPlaying, isFaceDetected  } = this.state;
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
                source={require('../assets/audioBackground.mp4')}
                style={stylesMedia.backgroundVideo}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={isPlaying}
                isLooping={true}
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

export default AudioReactionPage;
