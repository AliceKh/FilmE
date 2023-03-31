import React from 'react';
import {Text,View,Image, TextInput, Button} from 'react-native';

export default class Login extends React.Component{

    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={{height:"100%"}}>
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
                        secureTextEntry={true}
                        color='#6E2E76'
                        textAlign='left'
                        style={{width:"100%"}}
                    />
                </View>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:50,
                    paddingVertical:10
                }}>
                    <Button title='Login'
                        onPress={()=>navigate('ImageGrid')}
                        color="#9960D2"
                        ></Button>
                </View>

                <Image
                    style={{alignSelf:"center",
                            margin:"15%",
                            height:240,
                        width:135}}
                            
                    source={require("../assets/blackLogo.png")}
                />
                <Text                 
                    onPress={()=>navigate('Register')}
                    
                    style={{
                        alignSelf:"center",
                        color:"#9960D2",
                        paddingVertical:10
                    }}>New User
                </Text>

                {/* <Text 
                onPress={()=>navigate('ImageGrid')}
                style={{
                    alignSelf:"center",
                    color:"#00716F",
                    paddingVertical:30
                }}>Images</Text> */}
            </View>
        )
    }
}