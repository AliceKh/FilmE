import React, {useState} from 'react';
import {Alert, Button, Image, Text, TextInput, View} from 'react-native';
import {register} from '../services/AuthService';
import {saveLogin} from "../services/AsyncStorageService";

export default function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const {navigate} = props.navigation;

    function submitRegistration() {
        register(email, password, username)
            .then(async () => {
                await saveLogin(email, password);
                navigate('ExplorePage');
            })
            .catch((error) => {
                console.log(error);
                registrationFailedAlert();
            });
    }

    function registrationFailedAlert() {
        Alert.alert('Oops!', 'Registration failed', [{text: 'OK', onPress: () => console.log('')}]); // TODO console.log
    }

    return (<View style={{height: "100%"}}>
            <View style={{
                marginHorizontal: 55,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 45,
                paddingVertical: 10,
                borderRadius: 23
            }}>
                <Text style={{
                    color: "#9960D2", margin: 5, fontSize: 24
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
                    onChangeText={username => setUsername(username)}
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
                    onChangeText={email => setEmail(email)}
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
                    onChangeText={pass => setPassword(pass)}
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
                        onPress={submitRegistration}
                ></Button>
            </View>

            <Image
                style={{
                    alignSelf: "center", margin: "5%", height: 240, width: 135
                }}

                source={require("../assets/blackLogo.png")}
            />
            <Text
                onPress={() => navigate('Login')}

                style={{
                    alignSelf: "center", color: "#9960D2", paddingBottom: "5%"
                }}>Login
            </Text>
        </View>)
}