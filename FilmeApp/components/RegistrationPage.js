import React, {useState} from 'react';
import { ActivityIndicator, Alert, Button, Dimensions, Image, Text, TextInput, View } from 'react-native';
import { saveLogin } from "../services/AsyncStorageService";
import { register } from '../services/AuthService';
import { confirmValidation, emailValidation, passwordValidation, usernameValidation } from '../services/Validation';
import { stylesLogin } from '../styles/style';

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

    async function validation() {
        setPasswordErrorMessage(passwordValidation(password));
        setConfirmPasswordMessage(confirmValidation(confirmPassword, password));
        setUsernameErrorMessage(usernameValidation(username));
        setEmailErrorMessage(emailValidation(email));
    }

    function registrationFailedAlert(error) {
        Alert.alert('Oops!', 'Registration failed ' + error, [{text: 'OK', onPress: () => console.log(error)}]);
    }

    return (
        <View>
            {isLoading ?
            <View style={{paddingTop: height/2}}>
                <ActivityIndicator size="large" color="#9960D2" /> 
            </View>
            :
            <View>
            <View style={stylesLogin.title}>
                <Text style={stylesLogin.titleText}>Welcome!</Text>
            </View>
            <View style={stylesLogin.inputContainer}>
                <TextInput
                    placeholder="User Name"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={username => {
                        setUsernameErrorMessage('');
                        setUsername(username)
                    }}
                />
            </View>

            {usernameErrorMessage.length > 0 &&
                <Text style={stylesLogin.error}>{usernameErrorMessage}</Text>}

            <View style={stylesLogin.inputContainer}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#909580"
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={email => {
                        setEmailErrorMessage('');
                        setEmail(email)
                    }}
                />
            </View>

            {emailErrorMessage.length > 0 &&
                <Text style={stylesLogin.error}>{emailErrorMessage}</Text>}

            <View style={stylesLogin.inputContainer}>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={true}
                    color='#6E2E76'
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={pass => {
                        setPasswordErrorMessage('');
                        setPassword(pass);
                    }}
                />

            </View>

            {passwordErrorMessage.length > 0 &&
                <Text style={stylesLogin.error}>{passwordErrorMessage}</Text>}

            <View style={stylesLogin.inputContainer}>
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#909580"
                    secureTextEntry={true}
                    color='#6E2E76'
                    textAlign='left'
                    style={stylesLogin.inputText}
                    onChangeText={conPass => {
                        setConfirmPasswordMessage('');
                        setConfirmPassword(conPass);
                    }}
                />
            </View>

            {confirmPasswordErrorMessage.length > 0 && <Text
                style={stylesLogin.error}>{confirmPasswordErrorMessage}</Text>}

            <View style={stylesLogin.buttonContainer}>
                <Button title='Sign Up'
                        color="#9960D2"
                        onPress={submitRegistration}
                ></Button>
            </View>

            <Image
                style={stylesLogin.logo}

                source={require("../assets/blackLogo.png")}
            />
            <Text
                onPress={() => navigate('Login')}

                style={stylesLogin.linkButton}>Login
            </Text>
        </View>}
    </View>)
}
