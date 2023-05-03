import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
      lastTwoClicked: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/uploads')
      .then(response => {
        this.setState({ songs: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSearch = () => {
    console.log(`Searching for "${this.state.searchTerm}"`);
  };

  handleSongClick = (item) => {
    const { lastTwoSongs } = this.state;
    if (lastTwoSongs.length < 2) {
      // If there are less than two songs, simply add the new song
      this.setState({ lastTwoSongs: [ ...lastTwoSongs, item ] });
    } else {
      // If there are already two songs, shift out the oldest one and add the new one
      this.setState({ lastTwoSongs: [ lastTwoSongs[1], item ] });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../images/previous.png')} 
                       style={{ width: 20, height: 20, color: 'white' }} />
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
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View style={styles.recentlyPlayedContainer}>
          <FlatList
            data={this.state.lastTwoClicked.slice(0,2)}
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
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={this.state.songs.slice(0,4)}
          renderItem={({item}) =>(
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={{uri : item.LinkToPreviewImage}} />
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item.Title}</Text>
                <Text style={styles.artistName}>{item.Uploader.Username}</Text>
              </View>
              <TouchableOpacity onPress={() => {
                let {lastTwoClicked} = this.state;
                let foundIndex = lastTwoClicked.findIndex(song => song._id === item._id);
                if (foundIndex !== -1 && foundIndex < 2) {
                  // If song is already in the list, swap the position with the last item
                  if (foundIndex == 0 || foundIndex == 1) {
                    if(foundIndex == 1){
                    let temp = lastTwoClicked[foundIndex];
                    lastTwoClicked[foundIndex] = lastTwoClicked[0];
                    lastTwoClicked[0] = temp;
                  }
                }
                }
                else if (foundIndex >= 2) {
                  lastTwoClicked.push(lastTwoClicked.shift());
                }
                else {
                  // If song is not in the list, add it to the end
                  lastTwoClicked.push(item);
                  if (lastTwoClicked.length > 2) {
                    lastTwoClicked.push(lastTwoClicked.shift());
                  }
                } 
                // Update state with the new recently played songs list
                this.setState({lastTwoClicked});
                this.props.navigation.navigate('VideoReactionPage', { selectedItem: item })}
              }>
                <Image source={require('../images/right.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  searchBar: {
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
