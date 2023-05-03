import React from 'react';
import {Button, Image, Text, TextInput, View} from 'react-native';
import { register } from '../services/AuthService';

export default class Register extends React.Component {
    submitRegistration = () =>{
        register(this.emailRef.value, this.passwordRef.value, this.usernameRef.value)
            .then(() => this.props.navigation.navigate('ExplorePage'))
            .catch((error) => {
                console.log(error); 
                alert("Registration Failed");
                this.registrationFailedAlert();
            });
    }

    registrationFailedAlert = () => {
        Alert.alert('Oops!', 'Registration failed', [{text: 'OK', onPress: ()=>console.log('')}]);
    }

    render() {
        const {navigate} = this.props.navigation
        return (
            <View style={{height: "100%"}}>
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
                    }}>Welcome!</Text>
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
                        placeholder="User Name"
                        placeholderTextColor="#909580"
                        textAlign='left'
                        style={{width: "100%"}}
                        ref={(username) => {this.usernameRef = username}}
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
                        placeholder="Email"
                        placeholderTextColor="#909580"
                        textAlign='left'
                        style={{width: "100%"}}
                        ref={(email) => {this.emailRef = email}}
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
                        ref={(pass) => {this.passwordRef = pass}}
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
                            onPress={this.submitRegistration}
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
                <Text
                    onPress={() => navigate('Login')}

                    style={{
                        alignSelf: "center",
                        color: "#9960D2",
                        paddingBottom: "5%"
                    }}>Login
                </Text>
            </View>
        )
    }
}