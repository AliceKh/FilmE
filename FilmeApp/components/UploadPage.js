import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default class UploadPage extends React.Component {
    render() {
        return (
            <View style={styles.page}>
                <View style={{
                    marginHorizontal: 55,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 45,
                    paddingVertical: 10,
                    borderRadius: 23
                }}>
                    <Text style={{
                        color: "#9960D2",
                        margin: 5,
                        fontSize: 24
                    }}>Upload</Text>
                </View>
                <View style={{
                    marginHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    paddingVertical: 10,
                    borderRadius: 23
                }}>
                    <Image
                        source={require('../assets/upload-up-arrow.png')}
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1
                        }}/>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundImage: 'coral',
            // 'linear-gradient(to right, #29024f, #000000, #29024f)',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        color: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    recentlyPlayed: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    },
    seeAll: {
        color: 'gray',
        fontSize: 16,
    },
    recentlyPlayedContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    recentlyPlayedItem: {
        alignItems: 'center',
    },
    recentlyPlayedImage: {
        width: 150,
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
    },
    recentlyPlayedName: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    recentlyPlayedArtist: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray'
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    songImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    songDetails: {
        flex: 1,
    },
    songName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    artistName: {
        fontSize: 14,
        color: 'gray'
    },
});

// import {Component} from "react";
// import {Image, Text, View} from "react-native";
// export default class UploadPage extends Component {
//
//     render() {
//         <View>
//             <Text>Upload!</Text>
//             <Image source={require('./../assets/upload-up-arrow.png')}></Image>
//         </View>
//     };
// }

