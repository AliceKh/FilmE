import React from 'react';
import {Image, Text, View} from 'react-native';

export default class GraphPage extends React.Component {

    render() {
        return (
            <View style={{backgroundColor: "#FFF", height: "100%"}}>

                <View style={{
                    marginHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                    paddingVertical: 10,
                    borderRadius: 23
                }}>
                    <Image
                        source={require('../assets/graph.jpg')}
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