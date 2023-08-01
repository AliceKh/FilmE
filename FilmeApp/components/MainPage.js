import React from 'react';
import {Text,View,Image, Button} from 'react-native';
import { stylesLogin } from '../styles/style';

export default class Home extends React.Component{

    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={stylesLogin.mainBackground}>
                <Image
                    style={stylesLogin.mainLogo}
                    source={require("../assets/mainLogo.png")}
                />
                <View style={stylesLogin.title}>
                    <Text style={stylesLogin.titleText}>Are You Ready?</Text>
                </View>

                <View style={stylesLogin.title}>
                    <Button title='Go!'
                        color="#9960D2"
                        onPress={()=>navigate('Login')}
                        ></Button>
                </View>
            </View>
        )
    }
}