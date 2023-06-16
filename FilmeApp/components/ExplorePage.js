import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios'
import { BackHandler } from 'react-native';

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
      lastTwoClicked: [],
      AllSongs: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/exploreuploads')
      .then(response => {
        this.setState({ songs: response.data });
      })
      .catch(error => {
        console.log(error);
      });

    AsyncStorage.getItem('AllSongs')
    .then((value) => {
      if (value) {
        this.setState({ AllSongs: JSON.parse(value) });
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.AllSongs !== this.state.AllSongs) {
      AsyncStorage.setItem('AllSongs', JSON.stringify(this.state.AllSongs))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSearch = () => {
    console.log(`Searching for "${this.state.searchTerm}"`);
  };

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

    generateAvatar = (name) => {
      const initials = name.substr(0, 2).toUpperCase();
      const avatarSize = 200;
      const circleRadius = avatarSize / 2;
  
      return (
        <Svg width={avatarSize} height={avatarSize}>
          <Circle
            cx={circleRadius}
            cy={circleRadius}
            r={circleRadius}
            fill="gray"
          />
          <Text
            x={circleRadius}
            y={circleRadius + 8}
            textAnchor="middle"
            fontSize="72"
            fontWeight="bold"
            fill="white"
          >
            {initials}
          </Text>
        </Svg>
      );
    };

  render() {
    return (
      <LinearGradient
         colors={['#29024f', '#000000', '#29024f']}
         style={styles.container}
        >
        <View style={styles.header}>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
        <Image source={require('../images/previous.png')} style={{ width: 20, height: 20, color: 'white' }}/>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage', { previousRouteName: 'ExplorePage' })}>
            <Text style={ styles.headerText }>{"  Profile Page "}
              <Image source={require('../images/up.png')} style={{ width: 16, height: 16 }} />
            </Text>
          </TouchableOpacity>   
            <TouchableOpacity onPress={this.toggleMenu}>
            <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={24} color="gray" style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            value={this.state.searchTerm}
            onChangeText={(searchTerm) => this.setState({ searchTerm })}
            onSubmitEditing={this.handleSearch}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.recentlyPlayed}>Recently Played</Text>
          <Text style={styles.seeAll} onPress={() => this.props.navigation.navigate('SeeAllPage',
                                                     { selectedItem: this.state.AllSongs,
                                                       type: "recently" })}>See All</Text>
        </View>
        <View style={styles.recentlyPlayedContainer}>
          <FlatList
            data={this.state.AllSongs.slice(0,2)}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.recentlyPlayedItem} onPress={() => this.props.navigation.navigate('VideoReactionPage', { selectedItem: item })}>
                <Image style={styles.recentlyPlayedImage} source={{uri : item.LinkToPreviewImage}} />
                <View style={styles.songDetails}>
                  <Text style={styles.recentlyPlayedName}>{item.Title}</Text>
                  <Text style={styles.recentlyPlayedArtist}>{item.Uploader.Username}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item._id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.heading}>Recommendation</Text>
          <Text style={styles.seeAll} onPress={() => this.props.navigation.navigate('SeeAllPage',
                                                     { selectedItem: this.state.songs,
                                                       type: "all" })}>See All</Text>
        </View>
        <FlatList
          data={this.state.songs.slice(0,7)}
          renderItem={({item}) =>(
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={{uri : item.LinkToPreviewImage}} />
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item.Title}</Text>
                <Text style={styles.artistName}>{item.Uploader.Username}</Text>
              </View>
              <TouchableOpacity onPress={() => {
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
  headerText:{
    fontSize: 16,
    color: 'white'
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
