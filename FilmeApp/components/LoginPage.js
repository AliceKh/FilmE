import React, { useState } from 'react';
import {Text,View,Image, TextInput, Button, Alert, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import { login } from '../services/AuthService';
import { styles, stylesLogin } from '../styles/style';

export default function Login (props) {    
    const { height } = Dimensions.get('screen');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hidePassword, sethidePassword] = useState(true);
    const {navigate} = props.navigation;

    function submitLogin(){
        setIsLoading(true);
        login(email, password)
            .then(() => {
                navigate('ExplorePage', { previousRouteName: 'Login' });
            })
            .catch((error) => {
                loginFailedAlert(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function loginFailedAlert (error){
        Alert.alert('Oops!', 'Login failed: ' + error, [{text: 'OK', onPress: ()=>console.log(error)}]);
    }

    changePasswordVisibility = () => {
        sethidePassword(!hidePassword);
    }

    return(
        <View>
            {isLoading ?
            <View style={{paddingTop: height/2}}>
                <ActivityIndicator size="large" color="#9960D2" /> 
            </View>
            :
            <View>
            <View style={styles.header}>
            </View>
            <View style={stylesLogin.title}>
                <Text style={stylesLogin.titleText}>Hi There!</Text>
            </View>
            <View style={stylesLogin.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={email => setEmail(email)}
                />
            </View>

            <View style={stylesLogin.inputContainer}>
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={hidePassword}
                    color='#6E2E76'
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={pass => setPassword(pass)}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={stylesLogin.visibilityView}
                  onPress={this.changePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? require('../images/show.png')
                        : require('../images/hide.png')
                    }
                    style={stylesLogin.visibilityBtn}
                  />
                </TouchableOpacity>
            </View>

            <View style={stylesLogin.buttonContainer}>
                <Button title='Login'
                    onPress={submitLogin}
                    color="#9960D2"
                    ></Button>
            </View>

            <Image
                style={stylesLogin.logo}  
                source={require("../assets/blackLogo.png")}
            />
            <Text                 
                onPress={()=>navigate('Register')}
                style={stylesLogin.linkButton}>New User
            </Text>
            </View>
            }
        </View>
    )
}