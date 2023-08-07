import React, {useContext, useState, useEffect} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import {Button, FAB, ProgressBar, SegmentedButtons} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { stylesUpload } from '../styles/style';

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
    const [dateWhenUploaded, setDateWhenUploaded] = useState('');
    const [type, setType] = useState('');
    const [tags, setTags] = useState('');
    const [timeStamps, setTimeStamps] = useState('');
    
    const [isImagePicked, setIsImagePicked] = useState(false);
    const [chosenPlayFile, setChosenPlayFile] = useState('');
    const [chosenImageFile, setChosenImageFile] = useState('');
    const [chosenPreviewFile, setChosenPreviewFile] = useState('');

    const { navigate } = props.navigation

    const uploader = props.navigation.getParam("userID");

    const FileUpload = () => {
        const uploadyContext = useContext(UploadyContext);
        const [failedItems, setFailedItems] = useState([]);
        const [failedBatches, setFailedBatches] = useState([]);
        const retry = useRetry();
        const retryBatch = useBatchRetry();

        useItemFinishListener((item) => {
            const response = item.uploadResponse.data;
            var nametype = response.mimetype.split("/")[0];
            var type = response.mimetype.split("/")[1];
            type = (type == "mpeg")? "mp3" : type;
            nametype = (nametype == "image")? "preview" : nametype

            const filename = response.originalname;

            const linkToMongo = "https://firebasestorage.googleapis.com/v0/b/filme-4277e.appspot.com/o/"
                                + nametype + "%2F" 
                                + filename + "?alt=media"

            console.log(linkToMongo)

            if(!isImagePicked){
                setLinkToStorage(linkToMongo);
            }
            else{
                setLinkToPreviewImage(linkToMongo);
            }      
        });
        useItemErrorListener(async (item, error) => {
            const itemIdentity = item.file ? item.file.name : item.url;

            if (!failedItems[itemIdentity]) {
              setFailedItems((failed) => {
                return { ...failed, [item.id]: item.file };
              });
        
              setFailedBatches((batches) => {
                return !batches.includes(item.batchId)
                  ? batches.concat(item.batchId)
                  : batches;
              });
            }
        });

        useItemStartListener(async (item) => {
        });
        let progress = useItemProgressListener((item) => {

        });
        
        useEffect(() => {
            const retryFailedItems = async () => {
            for (const item of Object.values(failedItems)) {
                if (item) {
                }
            }
            setFailedItems({});
            };

            const retryFailedBatches = async () => {
            for (const batchId of failedBatches) {
                await retryBatch(batchId);
            }
            setFailedBatches([]);
            };

            if (Object.keys(failedItems).length > 0) {
            retryFailedItems();
            }
            if (failedBatches.length > 0) {
            retryFailedBatches();
            }
        }, [failedItems, failedBatches, retry, retryBatch]);

        function handleDocumentSelection(setFunc, type) {
            console.log("enter:" + type);
            return async () => {
                try {
                    const result = await DocumentPicker.getDocumentAsync({
                        copyToCacheDirectory: false,
                        multiple: false,
                        type: `${type}/*`
                    });

                    if (result.type === 'success') {
                        setFunc(result);
                        setServerUploadDestUrl(server + type)
                        result.type = result.mimeType
                        uploadyContext.upload(result);
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
            <View style={stylesUpload.uploadView}>
                <FAB
                    icon="upload"
                    size={"large"}
                    loading={false}
                    disabled={!type || (!!chosenPlayFile && !!chosenImageFile)}
                    style={stylesUpload.uploadFAB}
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
            .then(r => console.log("uploaded!!"))

            navigate('ExplorePage')
    }

    return (
        <LinearGradient
         colors={['#29024f', '#000000', '#29024f']}
         style={stylesUpload.page}
        >
        <View style={stylesUpload.header}>
          <TouchableOpacity onPress={ () => navigate('ExplorePage')}>
            <Text style={ stylesUpload.headerText }>{"  Explore Page "}
              <Image source={require('../images/up.png')} style={{ width: 20, height: 20}} />
            </Text>
          </TouchableOpacity>
        </View>
            <View style={stylesUpload.titleView}>
                <Text style={stylesUpload.title}>Upload</Text>
            </View>
            <View style={stylesUpload.typeView}>
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

            <View style={stylesUpload.uploadPreviewView}>
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

            <View style={stylesUpload.borderInput}>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%", color: "white"}}
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
            </View>
            <View style={stylesUpload.borderInput}>
                <TextInput
                    placeholder="Tags (split by ' ')"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%", color: "white"}}
                    value={tags}
                    onChangeText={value => setTags(value)}
                />
            </View>
            <View style={stylesUpload.borderInput}>
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
        </LinearGradient>
    );
}