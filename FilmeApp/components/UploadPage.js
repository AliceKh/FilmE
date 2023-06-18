import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {Button, FAB, ProgressBar, SegmentedButtons} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
//import { NavigationContainer, useNavigation } from '@react-navigation/native';

import NativeUploady, {
    UploadyContext,
    useItemErrorListener,
    useItemFinishListener,
    useItemProgressListener,
    useItemStartListener
} from "@rpldy/native-uploady";
import axios from "axios";

export default function UploadPage() {
    const server = 'http://10.0.0.5:4000/upload/';
    const [serverUploadDestUrl, setServerUploadDestUrl] = React.useState(server);

    const [linkToStorage, setLinkToStorage] = useState('');
    const [linkToPreviewImage, setLinkToPreviewImage] = useState('');
    const [title, setTitle] = useState('');
    const [uploader, setUploader] = useState('64306b71dd045edb9b98d52d');
    const [dateWhenUploaded, setDateWhenUploaded] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState('');
    const [timeStamps, setTimeStamps] = useState('');

    const [chosenFile, setChosenFile] = useState('');
    const [chosenPreviewFile, setChosenPreviewFile] = useState('');

    //const navigation = useNavigation();

    const FileUpload = () => {
        const uploadyContext = useContext(UploadyContext);
        useItemFinishListener((item) => {
            const response = item.uploadResponse.data;
            console.log(`item ${item.id} finished uploading, response was: `, response);
            console.log(item.uploadResponse.data.fileRef.metadata.selfLink);

            setLinkToStorage(item.uploadResponse.data.fileRef.metadata.selfLink);
        });
        useItemErrorListener((item) => {
            console.log(`item ${item.id} upload error !!!! `, item);
            setChosenFile('');
        });
        useItemStartListener((item) => {
            console.log(`item ${item.id} starting to upload, name = ${item.file.name} ${item.file.type}`);
        });
        let progress = useItemProgressListener((item) => {

        });

        

        function handleDocumentSelection(setFunc, type) {
            return async () => {
                try {
                    const result = await DocumentPicker.getDocumentAsync({
                        copyToCacheDirectory: false,
                        multiple: false,
                        type: `${type}/*`
                    });
                    
                    if (result.type === 'success') {
                        console.warn('res : ' + JSON.stringify(result));
                        setFunc(result);

                        const formData = new FormData();
                        formData.append('file', {
                            uri: result.uri,
                            name: result.name,
                            type: result.type,
                        });
                        
                        try{
                        const response = await axios.post( serverUploadDestUrl + type, formData._parts[0][1]) //{uri: result.uri,
                                                                                       // name: result.name,
                                                                                       //type: result.type})
                        
                        console.log('Upload response:', response.data);
                        }
                        catch(error){
                            console.error('Error uploading file: ', error);
                        }

                        //setServerUploadDestUrl(serverUploadDestUrl + type)
                        //result.type = result.mimeType // uploady needs mimetype
                        //uploadyContext.upload(result);
                    }
                } catch (err) {
                    if (DocumentPicker.isCancel(err)) {
                        console.log("User cancelled the picker, exit any dialogs or menus and move on");
                    } else {
                        throw err;
                    }
                }
            };
        }

        return (
            <View style={styles.uploadView}>
                <FAB
                    icon="upload"
                    size={"large"}
                    loading={false}
                    disabled={!type || !!chosenFile}
                    style={styles.uploadFAB}
                    onPress={handleDocumentSelection(setChosenFile, type)}
                />
                {progress &&
                    <View>
                        <Text
                            numberOfLines={2}
                            ellipsizeMode={'middle'}>
                            {Math.ceil(progress.completed)}% uploaded...
                        </Text>
                        <ProgressBar
                            visible={progress.completed}
                            progress={progress.completed * 0.01}/>
                    </View>
                }
                {/*<Text*/}
                {/*    ellipsizeMode={'middle'}>*/}
                {/*    {{uploadFile}}*/}
                {/*</Text>*/}
            </View>
        )
    }
    const PreviewUpload = () => {

    }

    const handlePublish = () => {
        console.log("pressed publish");
        axios.post('http://10.0.0.5:4000/upload', {
            LinkToStorage:linkToStorage,
            LinkToPreviewImage:linkToPreviewImage,
            Title:title,
            Uploader:uploader,
            Type:type,
            Tags:tags,
            TimeStamps:timeStamps
        })
            .then(r => console.log("uploaded!!"))
    }

    return (
        <LinearGradient
         colors={['#29024f', '#000000', '#29024f']}
         style={styles.page}
        >
        <View style={styles.header}>
          {/* <TouchableOpacity onPress={() => navigation.navigate('ExplorePage', { previousRouteName: 'ProfilePage' })}>
            <Text style={ styles.headerText }>{"  Explore Page "}
              <Image source={require('../images/up.png')} style={{ width: 20, height: 20, color: 'white' }} />
            </Text>
          </TouchableOpacity> */}
        </View>
            <View style={styles.titleView}>
                <Text style={styles.title}>Upload</Text>
            </View>
            <View style={styles.typeView}>
                <SegmentedButtons
                    value={type}
                    onValueChange={setType}
                    buttons={[
                        {
                            value: 'audio',
                            label: 'Audio',
                            icon: 'headphones',
                            disabled: !!chosenFile,
                            style: styles.choseBtn
                        }, {
                            value: 'video',
                            label: 'Video',
                            icon: 'video',
                            disabled: !!chosenFile,
                            style: styles.choseBtn
                        },
                    ]}
                />
            </View>

            <NativeUploady
                destination={{
                    url: serverUploadDestUrl,
                    method: 'POST',
                    headers: {'content-type': 'multipart/form-data'}
                }}
                forceJsonResponse={true}>
                <FileUpload/>
            </NativeUploady>

            <View style={styles.uploadPreviewView}>
                <Button
                    icon="camera"
                    mode="outlined"
                    // onPress={handleDocumentSelection(setPreviewFile, 'image')}
                >
                    choose preview image
                </Button>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'middle'}>
                    {chosenPreviewFile?.name}
                </Text>
            </View>

            <View style={styles.borderInput}>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
            </View>
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="Tags (split by ' ')"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
                    value={tags}
                    onChangeText={value => setTags(value)}
                />
            </View>
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="TimeStamps (split by ' ')"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
                    value={timeStamps}
                    onChangeText={value => setTimeStamps(value)}
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
                <Button mode="contained" onPress={handlePublish}>
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
  choseBtn:{
    backgroundColor: "#9960D2"
  }
})



// const styles = StyleSheet.create({
//     page: {
//         paddingTop: 30,
//         flex: 1,
//     },
//     header:{
//         flexDirection: 'row',
//         alignItems: 'center', 
//         justifyContent: 'center', 
//         paddingHorizontal: 10
//     },
//     headerText:{
//         fontSize: 16,
//         color: 'white'
//     },
//     titleView: {
//         display: 'flex',
//         marginHorizontal: 55,
//         alignSelf: 'center',
//         margin: 10
//     },
//     title: {
//         color: "#9960D2",
//         margin: 5,
//         fontSize: 24
//     },
//     typeView: {
//         marginHorizontal: 80,
//     },
//     uploadView: {
//         // marginTop: 30,
//         // paddingVertical: 10,
//         // borderRadius: 23,
//         paddingTop: 10,
//         alignItems: 'center'
//     },
//     uploadPreviewView: {
//         paddingTop: 10,
//         marginHorizontal: 80,
//         alignItems: "center"
//     },
//     uploadFAB: {},
//     uploadedImage: undefined,
//     borderInput: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginHorizontal: 55,
//         borderWidth: 2,
//         marginTop: 10,
//         paddingHorizontal: 10,
//         borderColor: "#9960D2",
//         borderRadius: 12,
//         paddingVertical: 2
//     }

// })