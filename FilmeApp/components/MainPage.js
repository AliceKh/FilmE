import React from 'react';
import {Text,View,Image, TextInput, Button} from 'react-native';

export default class Home extends React.Component{

    render(){
        const {navigate} = this.props.navigation
        return(
            <View style={{height:"100%", backgroundColor:"rgba(20,8,32, 1.0)"}}>
                <Image
                    style={{alignSelf:"center",
                            margin:"15%",
                            height:280,
                        width:175}}
                            
                    source={require("../assets/mainLogo.png")}
                />
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
                    }}>Are You Ready?</Text>
                </View>

                <View style={{
                    marginHorizontal:55,
                    alignItems:"center",
                    justifyContent:"center",
                    marginTop:50,
                    paddingVertical:10
                }}>
                    <Button title='Go!'
                        color="#9960D2"
                        onPress={()=>navigate('Login')}
                        ></Button>
                </View>
            </View>
        )
    }
}