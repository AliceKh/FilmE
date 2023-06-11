import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image, Asset } from 'react-native';
import { Video, Audio, ResizeMode } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import ReactionRecording from './ReactionRecordingComponent';

const { height } = Dimensions.get('window');
const width = height * 0.5625; // 16:9 aspect ratio


class AudioReactionPage extends React.Component {
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
        this.state = {
            isPlaying: true,
            sound: undefined,
            audioFile: ""
        };

        const { navigation } = this.props;
        const audio = navigation.state.params.selectedItem

        this.downloadFile(audio);
    }

    downloadFile = async (audio) => {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if(status != 'granted') {
            console.log("Permissions error");
            return;
        }

        try {
        fileUrl = FileSystem.cacheDirectory + audio.Title + '.mp3';
        console.log("statrting download " + fileUrl);

        const downloadResumable = FileSystem.createDownloadResumable(audio.LinkToStorage, fileUrl, {}, false);
        const { uri } = await downloadResumable.downloadAsync(null, {shouldCache: false});

        console.log("completed: " + uri);
        this.setState({audioFile: uri});

        const asset  = await MediaLibrary.createAssetAsync(uri);
        console.log("Created: " + asset);
        this.playSound(audio);
        }
        catch (err) {
            console.log(err);
        }
    }

    playSound = async (audio) => {
        console.log('Loading Sound');
        const sound = new Audio.Sound()

        await sound.loadAsync({
            uri: this.state.audioFile
        })
        this.setState({sound: sound});

        console.log('Playing Sound');
        await sound.playAsync();        
    }

    handlePlayPause = () => {
        const { isPlaying, sound } = this.state;
        const video = this.videoRef.current;

        if (isPlaying) {
            sound.pauseAsync();
            video.pauseAsync()
        } else {
            sound.playAsync();
            video.playAsync();
        }
        this.setState({ isPlaying: !isPlaying });
    };

    render() {
        const { isPlaying } = this.state;
        const { navigation } = this.props;
        const item = navigation.state.params.selectedItem

        return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => {this.state.sound.pauseAsync(); this.props.navigation.goBack()}}>
                    <Image source={require('../images/previous.png')} 
                        style={{ width: 20, height: 20, color: 'white' }} />
                </TouchableOpacity> 
                <TouchableOpacity onPress={this.toggleMenu}>
                <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
            </View>
            <Video
            ref={this.videoRef}
            source={require('../assets/audioBackground.mp4')}
            style={styles.backgroundVideo}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay={isPlaying}
            isLooping={true}
            onReadyForDisplay={videoData => {
                //videoData.srcElement.style.position = "initial"
                //console.log(videoData)
            }}
            />
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
            <ReactionRecording isPlaying={this.state.isPlaying}></ReactionRecording>
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
    });

export default AudioReactionPage;
