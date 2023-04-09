import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const songs = [
    {
      id: '1',
      name: 'Song 1',
      artist: 'Artist 1',
      image: require('../images/user1.png')
    },
    {
      id: '2',
      name: 'Song 2',
      artist: 'Artist 2',
      image: require('../images/user1.png')
    },
    {
      id: '3',
      name: 'Song 3',
      artist: 'Artist 3',
      image: require('../images/user1.png')
    },
    {
      id: '4',
      name: 'Song 4',
      artist: 'Artist 4',
      image: require('../images/user1.png')
    },
    {
      id: '5',
      name: 'Song 5',
      artist: 'Artist 5',
      image: require('../images/user1.png')
    },
    {
        id: '6',
        name: 'Song 6',
        artist: 'Artist 6',
        image: require('../images/user1.png')
    },
    {
        id: '7',
        name: 'Song 7',
        artist: 'Artist 7',
        image: require('../images/user1.png')
    },
  ];

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearch = () => {
    // TODO: implement search functionality
    console.log(`Searching for "${this.state.searchTerm}"`);
  };

  render() {
    return (
      <View style={styles.container}>
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
          <View style={styles.recentlyPlayedItem}>
            <Image source={{ uri: 'https://picsum.photos/id/1015/200/200' }} style={styles.recentlyPlayedImage} />
            <Text style={styles.recentlyPlayedName}>Song Title</Text>
            <Text style={styles.recentlyPlayedArtist}>Artist Name</Text>
          </View>
          <View style={styles.recentlyPlayedItem}>
            <Image source={{ uri: 'https://picsum.photos/id/1018/200/200' }} style={styles.recentlyPlayedImage} />
            <Text style={styles.recentlyPlayedName}>Song Title</Text>
            <Text style={styles.recentlyPlayedArtist}>Artist Name</Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.heading}>Recommendation</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <FlatList
          data={songs}
          renderItem={({item}) => (
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={item.image} />
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item.name}</Text>
                <Text style={styles.artistName}>{item.artist}</Text>
              </View>
              <Image source={require('../images/right.png')} style={{ width: 30, height: 30 }} />
            </View>
          )}
          keyExtractor={item => item.id}
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
    borderRadius: 25,
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
