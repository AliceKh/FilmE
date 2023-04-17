import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {FAB, ProgressBar, SegmentedButtons} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import NativeUploady, {
    UploadyContext,
    useItemErrorListener,
    useItemFinishListener,
    useItemProgressListener,
    useItemStartListener
} from "@rpldy/native-uploady";

export default function UploadPage() {
    const [publish, setPublish] = React.useState('');
    const [serverUploadDestUrl, setServerUploadDestUrl] = React.useState('http://172.20.10.2:3000/upload/');
    const [uploadType, setUploadType] = React.useState('');
    const [uploadFile, setUploadFile] = useState('');
    const [previewFile, setPreviewFile] = useState('');

    const FileUpload = () => {
        const [uploadUrl, setUploadUrl] = useState(false);
        const uploadyContext = useContext(UploadyContext);
        useItemFinishListener((item) => {
            const response = item.uploadResponse.data;
            console.log(`item ${item.id} finished uploading, response was: `, response);
            console.log(item.uploadResponse.data.fileRef.metadata.selfLink);
            setUploadUrl(item.uploadResponse.data.fileRef.metadata.selfLink);
        });
        useItemErrorListener((item) => {
            console.log(`item ${item.id} upload error !!!! `, item);
            setUploadFile('');
        });
        useItemStartListener((item) => {
            console.log(`item ${item.id} starting to upload, name = ${item.file.name} ${item.file.type}`);
        });

        let progress = useItemProgressListener((item) => {
            // console.log(progress);
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
                        setServerUploadDestUrl(serverUploadDestUrl + type)
                        result.type = result.mimeType // uploady needs mimetype
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
            <View style={styles.uploadView}>
                <FAB
                    icon="upload"
                    size={"large"}
                    loading={false}
                    disabled={!uploadType || !!uploadFile}
                    style={styles.uploadFAB}
                    onPress={handleDocumentSelection(setUploadFile, uploadType)}
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


    return (
        <View style={styles.page}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Upload</Text>
            </View>
            <View style={styles.typeView}>
                <SegmentedButtons
                    value={uploadType}
                    onValueChange={setUploadType}
                    buttons={[
                        {
                            value: 'audio',
                            label: 'Audio',
                            icon: 'headphones',
                            disabled: !!uploadFile
                        }, {
                            value: 'video',
                            label: 'Video',
                            icon: 'video',
                            disabled: !!uploadFile
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

            {/*<View style={styles.uploadPreviewView}>*/}
            {/*    <Button*/}
            {/*        icon="camera"*/}
            {/*        mode="outlined"*/}
            {/*        onPress={handleDocumentSelection(setPreviewFile, 'image')}*/}
            {/*    >*/}
            {/*        choose preview image*/}
            {/*    </Button>*/}
            {/*    <Text*/}
            {/*        numberOfLines={1}*/}
            {/*        ellipsizeMode={'middle'}>*/}
            {/*        {previewFile?.name}*/}
            {/*    </Text>*/}
            {/*</View>*/}
            {/*<View>*/}
            {/*    <Button*/}
            {/*        icon="camera"*/}
            {/*        mode="contained"*/}
            {/*        onPress={handleDocumentSelection(setPreviewFile, 'image')}*/}
            {/*    >*/}
            {/*        Upload*/}
            {/*    </Button>*/}
            {/*</View>*/}
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="Title"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
                />
            </View>
            <View style={styles.borderInput}>
                <TextInput
                    placeholder="Tags"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
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
                {/*<Button title='Publish'*/}
                {/*        color="#9960D2"*/}
                {/*></Button>*/}
            </View>

            <Image
                style={{
                    alignSelf: "center",
                    margin: "5%",
                    height: 240,
                    width: 135
                }}

                source={require("../assets/blackLogo.png")}
            />
            {/*<Text*/}
            {/*    onPress={() => navigate('Login')}*/}

            {/*    style={{*/}
            {/*        alignSelf: "center",*/}
            {/*        color: "#9960D2",*/}
            {/*        paddingBottom: "5%"*/}
            {/*    }}>Login*/}
            {/*</Text>*/}


        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 25
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


