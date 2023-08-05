import React, {useState} from 'react';
import {ActivityIndicator, Alert, Button, Dimensions, Image, Text, TextInput, View} from 'react-native';
import {register} from '../services/AuthService';
import {confirmValidation, emailValidation, passwordValidation, usernameValidation} from '../services/Validation';
import {saveLogin} from "../services/StayLoggedInService";

export default function Register(props) {
    const {height} = Dimensions.get('screen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {navigate} = props.navigation;
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [confirmPasswordErrorMessage, setConfirmPasswordMessage] = useState('');
    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function submitRegistration() {
        await validation();
        if (!passwordErrorMessage && !confirmPasswordErrorMessage && !usernameErrorMessage && !emailErrorMessage) {
            setIsLoading(true);

            register(email, password, username)
                .then(async () => {
                    await saveLogin(email, password);
                    navigate('ExplorePage')
                })
                .catch((error) => {
                    registrationFailedAlert(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });

        }
    }

    function validation() {
        setPasswordErrorMessage(passwordValidation(password));
        setConfirmPasswordMessage(confirmValidation(confirmPassword, password));
        setUsernameErrorMessage(usernameValidation(username));
        setEmailErrorMessage(emailValidation(email));
    }

    function registrationFailedAlert(error) {
        Alert.alert('Oops!', 'Registration failed ' + error, [{text: 'OK', onPress: () => console.log(error)}]);
    }

    return (<View style={{height: "100%"}}>
        {isLoading ? <View style={{paddingTop: height / 2}}>
            <ActivityIndicator size="large" color="#9960D2"/>
        </View> : <View>
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
                    onChangeText={username => {
                        setUsernameErrorMessage('');
                        setUsername(username)
                    }}
                />
            </View>

            {usernameErrorMessage.length > 0 &&
                <Text style={{color: "#dc3545", paddingHorizontal: 35,}}>{usernameErrorMessage}</Text>}

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
                    onChangeText={email => {
                        setEmailErrorMessage('');
                        setEmail(email)
                    }}
                />
            </View>

            {emailErrorMessage.length > 0 &&
                <Text style={{color: "#dc3545", paddingHorizontal: 35,}}>{emailErrorMessage}</Text>}

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
                    onChangeText={pass => {
                        setPasswordErrorMessage('');
                        setPassword(pass);
                    }}
                />

            </View>

            {passwordErrorMessage.length > 0 &&
                <Text style={{color: "#dc3545", paddingHorizontal: 35,}}>{passwordErrorMessage}</Text>}

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
                    onChangeText={conPass => {
                        setConfirmPasswordMessage('');
                        setConfirmPassword(conPass);
                    }}
                />
            </View>

            {confirmPasswordErrorMessage.length > 0 && <Text
                style={{color: "#dc3545", paddingHorizontal: 35}}>{confirmPasswordErrorMessage}</Text>}

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
        </View>}
    </View>)
}
