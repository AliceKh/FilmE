import React, {useContext, useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {Button, FAB, ProgressBar, SegmentedButtons} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';

import NativeUploady, {
    UploadyContext,
    useItemErrorListener,
    useItemFinishListener,
    useItemProgressListener,
    useItemStartListener,
    useUploady
} from "@rpldy/native-uploady";

import retryEnhancer, { useBatchRetry, useRetry, useRetryListener } from "@rpldy/retry-hooks";

import axios from "axios";

export default function UploadPage(props) {
    const server = `http://${global.server}:4000/upload/`;
    const [serverUploadDestUrl, setServerUploadDestUrl] = React.useState(server);

    const [linkToStorage, setLinkToStorage] = useState('');
    const [linkToPreviewImage, setLinkToPreviewImage] = useState('');
    const [title, setTitle] = useState('');
    const [uploader, setUploader] = useState('64306b71dd045edb9b98d52d');
    const [dateWhenUploaded, setDateWhenUploaded] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState('');
    const [timeStamps, setTimeStamps] = useState('');
    
    const [isImagePicked, setIsImagePicked] = useState(false);
    const [chosenPlayFile, setChosenPlayFile] = useState('');
    const [chosenImageFile, setChosenImageFile] = useState('');
    const [chosenPreviewFile, setChosenPreviewFile] = useState('');

    const retry = useRetry();

    const { navigate } = props.navigation

    const FileUpload = () => {
        const uploadyContext = useContext(UploadyContext);
        const [failedItems, setFailedItems] = useState([]);
        const [failedBatches, setFailedBatches] = useState([]);
        const [uploadResult, setUploadResult] = useState(null);
        const retryBatch = useBatchRetry();

        useItemFinishListener((item) => {
            const response = item.uploadResponse.data;
            console.log(`item ${item.id} finished uploading, response was: `, response);
            var nametype = response.mimetype.split("/")[0];
            var type = response.mimetype.split("/")[1];
            type = (type == "mpeg")? "mp3" : type;
            nametype = (nametype == "image")? "preview" : nametype
            const filename = response.originalname

            const linkToMongo = "https://firebasestorage.googleapis.com/v0/b/filme-4277e.appspot.com/o/"
            + nametype + "%2F" + filename + "." + type + "?alt=media"

            if(!isImagePicked){
                setLinkToStorage(linkToMongo);
            }
            else{
                setLinkToPreviewImage(linkToMongo);
            }      

            setUploadedResult(item.uploadResponse.data);
        });
        
        useItemErrorListener(async (item, error) => {
            console.error(`Error occurred while uploading ${item.file.name}: ${error}`);
            if (!failedItems.some((failedItem) => failedItem.id === item.id)) {
                setFailedItems((prevFailedItems) => [...prevFailedItems, item]);
                setFailedBatches((batches) =>
                !batches.includes(item.batchId) ? batches.concat(item.batchId) : batches
                );
            }

            if (retry.uploadResult) {
                await retry(retry.uploadResult);
            }
        });

        useItemStartListener(async (item) => {
            console.log(`item ${item.id} starting to upload, name = ${item.file.name} ${item.file.type}`);
        });
        let progress = useItemProgressListener((item) => {

        });
        
        useEffect(() => {
            const retryFailedItems = async () => {
              for (const item of failedItems) {
                await retry(item.file);
              }
              setFailedItems([]);
            };
      
            const retryFailedBatches = async () => {
              for (const batchId of failedBatches) {
                console.log(`Retry ${JSON.stringify(batchId)}`);
                await retryBatch(batchId);
              }
              setFailedBatches([]);
            };
      
            if (failedItems.length > 0) {
              retryFailedItems();
            }
            if (failedBatches.length > 0) {
              retryFailedBatches();
            }
          }, [failedItems, failedBatches, retry, retryBatch]);

         const handleDocumentSelection = (setFunc, type) => {
            console.log("enter:" + type);
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
                        setServerUploadDestUrl(serverUploadDestUrl + type)                        
                        result.type = result.mimeType // uploady needs mimetype
                        uploadyContext.upload(result);
                        setServerUploadDestUrl(server)
                    }
                } catch (err) {
                    if (DocumentPicker.isCancel(err)) {
                        console.log("User cancelled the picker, exit any dialogs or menus and move on"); // TODO console.log
                    } else {
                        console.error(`Error occurred while uploading ${result.name}: ${err}`);
                        retry.uploadResult = result;
                        await retry(result.id);
                        retry.uploadResult = null;
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
                    disabled={!type || (!!chosenPlayFile && !!chosenImageFile)}
                    style={styles.uploadFAB}
                    onPress={async () => {
                        console.log(isImagePicked)
                        if (!isImagePicked) {
                            console.log("test: " + type);
                            await handleDocumentSelection(setChosenPlayFile, type)();
                        } else {
                            await handleDocumentSelection(setChosenImageFile, 'image')();
                        }
                    }}
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
            </View>
        )
    }
    const PreviewUpload = () => {

    }

    const handlePublish = () => {
        axios.post(`http://${global.server}:4000/upload/`, {
            LinkToStorage:linkToStorage,
            LinkToPreviewImage:linkToPreviewImage,
            Title:title,
            Uploader:uploader,
            Type:type,
            Tags:tags,
            TimeStamps:timeStamps
        })
            .then(r => console.log("uploaded!!")) // TODO console.log
    }

    return (
        <LinearGradient
         colors={['#29024f', '#000000', '#29024f']}
         style={styles.page}
        >
        <View style={styles.header}>
          <TouchableOpacity onPress={ () => navigate('ExplorePage')}>
            <Text style={ styles.headerText }>{"  Explore Page "}
              <Image source={require('../images/up.png')} style={{ width: 20, height: 20}} />
            </Text>
          </TouchableOpacity>
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
                            disabled: !!chosenPlayFile,
                            uncheckedColor: "#9960D2"
                        }, {
                            value: 'video',
                            label: 'Video',
                            icon: 'video',
                            disabled: !!chosenPlayFile,
                            uncheckedColor: "#9960D2"
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
                enhancer={retryEnhancer}
                forceJsonResponse={true}>
                <FileUpload/>
            </NativeUploady>

            <View style={styles.uploadPreviewView}>
                <Button
                    icon="camera"
                    mode="outlined"
                    onPress={() => setIsImagePicked(true)}
                    
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
                    style={{width: "100%", color: "white"}}
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
            </View>
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="Tags (split by ' ')"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%", color: "white"}}
                    value={tags}
                    onChangeText={value => setTags(value)}
                />
            </View>
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="TimeStamps (split by ' ')"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%", color: "white"}}
                    value={timeStamps}
                    onChangeText={value => setTimeStamps(value)}
                />
            </View>
            <View style={{
                marginHorizontal: 55,
                paddingHorizontal: 5,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
                paddingVertical: 10
            }}>
                <Button mode="contained" onPress={handlePublish}>
                    Publish
                </Button>
            </View>

            {<Image
                style={{
                    alignSelf: "center",
                    margin: "5%",
                    height: 170,
                    width: 120
                }}

                source={require("../assets/mainLogo2.png")}
            />}
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
    header:{
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 10
    },
    headerText:{
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
    }

})