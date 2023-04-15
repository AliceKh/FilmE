import React, {useCallback, useState} from 'react';
import {Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {FAB} from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';

export default function UploadPage() {
    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                multiple: false,
                // type: 'image/*',
            });

            if (result.type === 'success') {
                console.warn('res : ' + JSON.stringify(result));
                setFileResponse(result);
            }
        } catch (err) {
            console.warn(err);
        }
    }, []);
    //todo uplodyify
    return (
        <View style={styles.page}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Upload</Text>
            </View>
            <View style={styles.uploadView}>
                <FAB
                    icon="upload"
                    size={"large"}
                    loading={false}
                    style={styles.uploadFAB}
                    // onPress={() => console.log("pressed")}
                    onPress={handleDocumentSelection}
                />
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'middle'}>
                    {fileResponse?.name}
                </Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 55,
                borderWidth: 2,
                marginTop: 55,
                paddingHorizontal: 10,
                borderColor: "#9960D2",
                borderRadius: 12,
                paddingVertical: 2
            }}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width: "100%"}}
                />
            </View>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 55,
                borderWidth: 2,
                marginTop: 25,
                paddingHorizontal: 10,
                borderColor: "#9960D2",
                borderRadius: 12,
                paddingVertical: 2
            }}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={true}
                    color='#6E2E76'
                    textAlign='left'
                    style={{width: "100%"}}
                />
            </View>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 55,
                borderWidth: 2,
                marginTop: 25,
                paddingHorizontal: 10,
                borderColor: "#9960D2",
                borderRadius: 12,
                paddingVertical: 2
            }}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={true}
                    color='#6E2E76'
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
                <Button title='Sign Up'
                        color="#9960D2"
                ></Button>
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
    // page:
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
    uploadView: {
        // marginTop: 30,
        // paddingVertical: 10,
        // borderRadius: 23,
        alignItems: 'center'
    },
    uploadFAB: {},
    uploadedImage: undefined

})


