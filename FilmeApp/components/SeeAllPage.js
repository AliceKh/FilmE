import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';
import { styles, stylesExplore } from '../styles/style';

export default class SeeAllPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      RecentlySongs: this.props.navigation.state.params.selectedItem,
      type: this.props.navigation.state.params.type,
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.RecentlySongs !== this.state.RecentlySongs) {
      AsyncStorage.setItem('RecentlySongs', JSON.stringify(this.state.RecentlySongs))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    const { navigation } = this.props;
    if (navigation && navigation.navigate) {
      navigation.navigate('ExplorePage');
      return true;
    }
    return false;
  };

  handleRecentlyPlayed = (item) =>{
    const { RecentlySongs } = this.state;
    let song = "";
    const foundIndex = RecentlySongs.findIndex(song => song._id === item._id);
          if (foundIndex !== -1) {
            if(foundIndex !== 0){
              song = RecentlySongs.splice(foundIndex,1)[0];
              RecentlySongs.unshift(song);
            }

          }
          else {
            // If song is not in the list, add it to the end
            RecentlySongs.unshift(item);
          } 
          // Update state with the new recently played songs list
          this.setState({ RecentlySongs: [...RecentlySongs] });
    }

  render() {
    return (
      <LinearGradient
         colors={['#29024f', '#000000', '#29024f']}
         style={styles.container}
        >
        <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../images/previous.png')} 
                        style={{ width: 20, height: 20 }} />
            </TouchableOpacity> 
            
        </View>

        <FlatList
          data={this.state.RecentlySongs}
          renderItem={({item}) =>(
            <View style={stylesExplore.songItem}>
              <Image style={stylesExplore.songImage} source={{uri : item.LinkToPreviewImage}} />
              <View style={stylesExplore.songDetails}>
                <Text style={stylesExplore.songName}>{item.Title}</Text>
                <Text style={stylesExplore.artistName}>{item.Uploader.Username}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                if(this.state.type == "recently")
                    this.handleRecentlyPlayed(item);
                item.Type == 'video' ? 
                this.props.navigation.navigate('VideoReactionPage', { selectedItem: item })
                : this.props.navigation.navigate('AudioReactionPage', { selectedItem: item });}
              }>
                <Image source={require('../images/right.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </LinearGradient>
    );
  }
}

