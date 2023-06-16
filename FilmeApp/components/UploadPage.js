import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Button, FAB, ProgressBar, SegmentedButtons } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';

import NativeUploady, {
  UploadyContext,
  useItemErrorListener,
  useItemFinishListener,
  useItemProgressListener,
  useItemStartListener
} from "@rpldy/native-uploady";
import axios from "axios";

export default class UploadPage extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigation;
    this.setChosenFile = this.setChosenFile.bind(this);
    this.state = {
      serverUploadDestUrl: 'http://10.0.0.5:4000/upload/',
      linkToStorage: '',
      linkToPreviewImage: '',
      title: '',
      uploader: '64306b71dd045edb9b98d52d',
      dateWhenUploaded: '',
      type: '',
      tags: '',
      timeStamps: '',
      chosenFile: '',
      chosenPreviewFile: ''
    };
  }

  setChosenFile = (file) =>{
    this.setState({
      chosenFile: file,
    });
  }
  
  handleDocumentSelection = async (type) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: false,
        multiple: false,
        type: `${type}/*`
      });

      if (result.type === 'success') {
        console.warn('res : ' + JSON.stringify(result));
        this.setChosenFile(result);
        this.setState({ serverUploadDestUrl: this.state.serverUploadDestUrl + type });
        result.type = result.mimeType; // uploady needs mimetype
        this.uploadyContext.upload(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker, exit any dialogs or menus and move on");
      } else {
        throw err;
      }
    }
  };

  handlePublish = () => {
    console.log("pressed publish");
    axios.post('http://10.0.0.5:4000/upload', {
      LinkToStorage: this.state.linkToStorage,
      LinkToPreviewImage: this.state.linkToPreviewImage,
      Title: this.state.title,
      Uploader: this.state.uploader,
      Type: this.state.type,
      Tags: this.state.tags,
      TimeStamps: this.state.timeStamps
    })
      .then(r => console.log("uploaded!!"));
  };

  render() {
    const FileUpload = () => {
        const uploadyContext = useContext(UploadyContext);
  
        useItemFinishListener((item) => {
          const response = item.uploadResponse.data;
          console.log(`item ${item.id} finished uploading, response was: `, response);
          console.log(item.uploadResponse.data.fileRef.metadata.selfLink);
          this.setState({
            linkToStorage: item.uploadResponse.data.fileRef.metadata.selfLink
          });
        });
  
        useItemErrorListener((item) => {
          console.log(`item ${item.id} upload error !!!! `, item);
          this.setState({
            chosenFile: ''
          });
        });
  
        useItemStartListener((item) => {
          console.log(`item ${item.id} starting to upload, name = ${item.file.name} ${item.file.type}`);
        });
  
        let progress = useItemProgressListener((item) => {});
  
        return (
          <View style={styles.uploadView}>
            <Button
              mode="contained"
              onPress={() => this.handleDocumentSelection(this.state.type)}
              style={styles.uploadButton}
            >
              Upload {this.state.type} File
            </Button>
            {progress && (
              <View>
                <Text numberOfLines={2} ellipsizeMode={'middle'}>
                  {Math.ceil(progress.completed)}% uploaded...
                </Text>
                <ProgressBar visible={progress.completed} progress={progress.completed * 0.01} />
              </View>
            )}
          </View>
        );
      };
    return (
        <LinearGradient
          colors={['#29024f', '#000000', '#29024f']}
          style={styles.page}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.headerText}>{"  Go Back "}
                <Image source={require('../images/up.png')} style={{ width: 20, height: 20}} />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>Upload</Text>
          </View>
          <View style={styles.typeView}>
            <SegmentedButtons
              value={this.state.type}
              onValueChange={type => this.setState({ type })}
              buttons={[
                {
                  value: 'audio',
                  label: 'Audio',
                  icon: 'headphones',
                  disabled: !!this.state.chosenFile,
                  uncheckedColor: "#9960D2"
                }, {
                  value: 'video',
                  label: 'Video',
                  icon: 'video',
                  disabled: !!this.state.chosenFile,
                  uncheckedColor: "#9960D2"  
                },
              ]}
            />
          </View>

          <NativeUploady
            destination={{
              url: this.state.serverUploadDestUrl,
              method: 'POST',
              headers: { 'content-type': 'multipart/form-data' }
            }}
            forceJsonResponse={true}
          >
            <FileUpload />
          </NativeUploady>

          <View style={styles.uploadPreviewView}>
            <Button
              icon="camera"
              mode="outlined"
              //onPress={this.handleDocumentSelection('image')}
            >
              choose preview image
            </Button>
            <Text
              numberOfLines={1}
              ellipsizeMode={'middle'}>
              {this.state.chosenPreviewFile?.name}
            </Text>
          </View>

          <View style={styles.borderInput}>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#909580"
              textAlign='left'
              style={{ width: "100%" }}
              value={this.state.title}
              onChangeText={title => this.setState({ title })}
            />
          </View>
          <View style={styles.borderInput}>
            <TextInput
              placeholder="Tags (split by ' ')"
              placeholderTextColor="#909580"
              textAlign='left'
              style={{ width: "100%" }}
              value={this.state.tags}
              onChangeText={tags => this.setState({ tags })}
            />
          </View>
          <View style={styles.borderInput}>
            <TextInput
              placeholder="TimeStamps (split by ' ')"
              placeholderTextColor="#909580"
              textAlign='left'
              style={{ width: "100%" }}
              value={this.state.timeStamps}
              onChangeText={timeStamps => this.setState({ timeStamps })}
            />
          </View>
          <View style={{
            marginHorizontal: 55,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            paddingVertical: 10
          }}>
            <Button mode="contained" onPress={this.handlePublish}>
              Publish
            </Button>
          </View>

          {/*<Image
                style={{
                    alignSelf: "center",
                    margin: "5%",
                    height: 240,
                    width: 135
                }}

                source={require("../assets/blackLogo.png")}
            />*/}
          {/*<Text*/}
          {/*    onPress={() => navigate('Login')}*/}

          {/*    style={{*/}
          {/*        alignSelf: "center",*/}
          {/*        color: "#9960D2",*/}
          {/*        paddingBottom: "5%"*/}
          {/*    }}>Login*/}
          {/*</Text>*/}
        </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 16,
    color: 'white'
  },
  titleView: {
    display: 'flex',
    marginHorizontal: 55,
    alignSelf: 'center',
    margin: 10
  },
  title: {
    color: "#9960D2",
    margin: 5,
    fontSize: 24
  },
  typeView: {
    marginHorizontal: 80,
  },
  uploadView: {
    // marginTop: 30,
    // paddingVertical: 10,
    // borderRadius: 23,
    paddingTop: 10,
    alignItems: 'center'
  },
  uploadPreviewView: {
    paddingTop: 10,
    marginHorizontal: 80,
    alignItems: "center"
  },
  uploadFAB: {},
  uploadedImage: undefined,
  borderInput: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 55,
    borderWidth: 2,
    marginTop: 10,
    paddingHorizontal: 10,
    borderColor: "#9960D2",
    borderRadius: 12,
    paddingVertical: 2
  },
})