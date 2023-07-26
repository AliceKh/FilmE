import React, { useState } from 'react';
import {Text,View,Image, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import { login } from '../services/AuthService';

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
                navigate('ExplorePage', { previousRouteName: 'LoginPage' });
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
        <View style={{height:"100%"}}>
            {isLoading ?
            <View style={{paddingTop: height/2}}>
                <ActivityIndicator size="large" color="#9960D2" /> 
            </View>
            :
            <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Image source={require('../images/previous.png')} 
                        style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
            <View style={{
                marginHorizontal:55,
                alignItems:"center",
                justifyContent:"center",
                marginTop:45,
                paddingVertical:10,
                borderRadius:23
            }}>
                <Text style={{
                    color:"#9960D2",
                    margin:5,
                    fontSize:24
                }}>Hi There!</Text>
            </View>
            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginHorizontal:55,
                borderWidth:2,
                marginTop:55,
                paddingHorizontal:10,
                borderColor:"#9960D2",
                borderRadius:12,
                paddingVertical:2
            }}>
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={{width:"100%"}}
                    onChangeText={email => setEmail(email)}
                />
            </View>

            <View style={{
                flexDirection:"row",
                alignItems:"center",
                marginHorizontal:55,
                borderWidth:2,
                marginTop:25,
                paddingHorizontal:10,
                borderColor:"#9960D2",
                borderRadius:12,
                paddingVertical:2
            }}>
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={hidePassword}
                    color='#6E2E76'
                    textAlign='left'
                    style={{width:"100%"}}
                    onChangeText={pass => setPassword(pass)}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityView}
                  onPress={this.changePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? require('../images/show.png')
                        : require('../images/hide.png')
                    }
                    style={styles.visibilityBtn}
                  />
                </TouchableOpacity>
            </View>

            <View style={{
                marginHorizontal:55,
                alignItems:"center",
                justifyContent:"center",
                marginTop:50,
                paddingVertical:10
            }}>
                <Button title='Login'
                    onPress={submitLogin}
                    color="#9960D2"
                    ></Button>
            </View>

            <Image
                style={{alignSelf:"center",
                        margin:"10%",
                        height:240,
                    width:135}}
                        
                source={require("../assets/blackLogo.png")}
            />
            <Text                 
                onPress={()=>navigate('Register')}
                
                style={{
                    alignSelf:"center",
                    color:"#9960D2",
                    paddingBottom:"5%"
                }}>New User
            </Text>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    visibilityBtn: {
        height: 15,
        width: 15,
        margin: 5
      },
      visibilityView: {
          position: 'absolute'
        }
});