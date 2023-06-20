import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient';

export default class SeeAllPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllSongs: this.props.navigation.state.params.selectedItem,
      type: this.props.navigation.state.params.type,
    };
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.AllSongs !== this.state.AllSongs) {
      AsyncStorage.setItem('AllSongs', JSON.stringify(this.state.AllSongs))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleRecentlyPlayed = (item) =>{
    const { AllSongs } = this.state;
    let song = "";
    const foundIndex = AllSongs.findIndex(song => song._id === item._id);
          if (foundIndex !== -1) {
            if(foundIndex !== 0){
              song = AllSongs.splice(foundIndex,1)[0];
              AllSongs.unshift(song);
            }

          }
          else {
            // If song is not in the list, add it to the end
            AllSongs.unshift(item);
          } 
          // Update state with the new recently played songs list
          this.setState({ AllSongs: [...AllSongs] });
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
            <TouchableOpacity onPress={this.toggleMenu}>
                <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.AllSongs}
          renderItem={({item}) =>(
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={{uri : item.LinkToPreviewImage}} />
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item.Title}</Text>
                <Text style={styles.artistName}>{item.Uploader.Username}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchBar: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#584177',
    borderRadius: 5,
    paddingHorizontal: 7,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: 'white'
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  recentlyPlayed: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white'
  },
  seeAll: {
    color: 'gray',
    fontSize: 16,
  },
  recentlyPlayedContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  recentlyPlayedItem: {
    alignItems: 'center',
  },
  recentlyPlayedImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 10,
  },
  recentlyPlayedName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  },
  recentlyPlayedArtist: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray'
  },
  songItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white'
  },
  artistName: {
    fontSize: 14,
    color: 'gray'
  },
  
});
