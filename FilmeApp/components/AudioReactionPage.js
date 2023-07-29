import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Modal, ActivityIndicator, BackHandler  } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ReactionRecording from './ReactionRecordingComponent';

const { height } = Dimensions.get('screen');
const width = height * 0.5625; // 16:9 aspect ratio


class AudioReactionPage extends React.Component {
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
        this.state = {
            isPlaying: false,
            isLoading: true,
            sound: undefined,
            audioFile: "",
            isDialogVisible: false,
            isFaceDetected: true
        };

        const { navigation } = this.props;
        const audio = navigation.state.params.selectedItem;

        this.downloadFile(audio);
    }

    componentDidMount() {
        BackHandler.addEventListener(
            'hardwareBackPress',
            this.handleBackButtonPressAndroid
        );
    }
    componentWillUnmount() {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackButtonPressAndroid
        );
    }
    handleBackButtonPressAndroid = () => {
        if(this.state.sound)
            this.state.sound.pauseAsync();
    
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

            console.log("starting download " + fileUrl);
            const downloadResumable = FileSystem.createDownloadResumable(audio.LinkToStorage, fileUrl, {}, false);
            const { uri } = await downloadResumable.downloadAsync(null, {shouldCache: false});

            console.log("download completed " + uri);
            this.setState({audioFile: uri});
            this.playSound();
        }
        catch (err) {
            console.log(err);
        }
    }

    playSound = async () => {
        const sound = new Audio.Sound();

        sound.setOnPlaybackStatusUpdate((status) => {
            if(status.didJustFinish) {
                this.setState({ isPlaying: false });
                sound.unloadAsync();
            }
        });

        await sound.loadAsync({
            uri: this.state.audioFile
        })
        this.setState({sound: sound});
        await sound.playAsync();
        this.setState({isLoading: false});
        this.setState({ isPlaying: true });
    }

    handlePlayPause = () => {
        const { isPlaying, sound } = this.state;
        const video = this.videoRef.current;

        if (isPlaying) {
            sound.pauseAsync();
            video.pauseAsync();
        } else {
            sound.playAsync();
            video.playAsync();
        }


        this.setState({ isPlaying: !isPlaying });
    };

    handleFaceDetectionChange = (isFaceDetected) => {
        const { sound } = this.state;
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

    handleEndOfVideo = (status) => {
        if(status.didJustFinish) {
            this.setState({isPlaying: false});
        }
    }

    render() {
        const { isDialogVisible, isPlaying, isFaceDetected  } = this.state;
        const { navigation } = this.props;
        const item = navigation.state.params.selectedItem

        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    this.state.sound.pauseAsync();
                    this.setState({ isPlaying: !isPlaying })
                    this.props.navigation.goBack()}}>
                    <Image source={require('../images/previous.png')} 
                        style={{ width: 20, height: 20}} />
                </TouchableOpacity> 
                <TouchableOpacity onPress={this.toggleMenu}>
                <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            </View>
            {this.state.isLoading ?
                <View style={{paddingTop: height/2}}>
                    <ActivityIndicator size="large" color="#9960D2" /> 
                </View>
                :
                <Video
                ref={this.videoRef}
                source={require('../assets/audioBackground.mp4')}
                style={styles.backgroundVideo}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={this.state.isPlaying}
                isLooping={true}
                onReadyForDisplay={videoData => {
                    //videoData.srcElement.style.position = "initial"
                    //console.log(videoData)
                }}
                />     
            }       
            <View style={styles.overlay}>
            <Text style={styles.title}>{item.Title}</Text>
            <Text style={styles.artist}>{item.Uploader.Username}</Text>
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
            <ReactionRecording isPlaying={this.state.isPlaying} 
                               uploaderId={item.Uploader._id}
                               mediaId={item._id}
                               onFaceDetectionChange={this.handleFaceDetectionChange} 
                               >
                        
            </ReactionRecording>
            <Modal visible={!isFaceDetected} animationType="slide" transparent={true}>
                <View style={styles.dialogContainer}>
                    <View style={styles.dialogContent}>
                    <Image source={require('../images/inFrame.png')} style={styles.dialogImage} />
                    <Text style={styles.dialogText}>You're Not in Frame</Text>
                    <Text style={styles.paraText}>Please adjust your position so that your face is centered within the square on the screen for optimal facial recognition.</Text>
                    </View>
                </View>
            </Modal>
        </View>
        );
    }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
    },
    header: {
        position: 'absolute',
        top: 20,
        left: 16,
        right: 16,
        height: 50,
        flexDirection: 'row-reverse',
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
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    controlButton: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
    },
    dialogContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginVertical: height / 6,
        marginHorizontal: width / 15,
        borderRadius: 20,
        borderWidth:1
      },
      dialogContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
      },  
      dialogImageContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
      },
      dialogTextContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
      },
      dialogButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      dialogImage: {
        width: '100%',
        height: '60%',
        resizeMode: 'cover',
        borderRadius: 20
      },
      dialogText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#807e7e',
        marginTop : 20
      },
      paraText: {
        marginTop: 10,
        color: '#cccccc',
        
      },
      dialogButton: {
        marginTop: 55,
        backgroundColor: 'red',
        borderRadius: 10,
      },
      headerText: {
        fontSize: 16,
        color: 'white'
      }
    });

export default AudioReactionPage;
