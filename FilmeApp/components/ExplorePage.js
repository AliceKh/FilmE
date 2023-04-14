import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
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
          data={this.state.songs}
          renderItem={({item}) =>(
            <View style={styles.songItem}>
              <Image style={styles.songImage} source={{uri : item.LinkToPreviewImage}} />
              <View style={styles.songDetails}>
                <Text style={styles.songName}>{item.Title}</Text>
                <Text style={styles.artistName}>{item.Uploader.Username}</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('VideoReactionPage', { selectedItem: item })}>
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
