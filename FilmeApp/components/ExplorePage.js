import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, FlatList, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getUploads } from '../services/ExploreService';
import { setAllSongs, getAllSongs } from '../services/AsyncStorageService';
import { styles, stylesExplore } from '../styles/style';

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      songs: [],
      lastTwoClicked: [],
      RecentlySongs: [],
      showSearchResults: false,
      searchResults: [],
    };
  }

  componentDidMount() {
    getUploads()
      .then(response => {
        this.setState({ songs: response });
      })
      .catch(error => {
        console.log(error);
      });

    getAllSongs()
    .then((value) => {
      if (value) {
        this.setState({ RecentlySongs: JSON.parse(value) });
      }
    })
    .catch((error) => {
      console.log(error);
    });
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.RecentlySongs !== this.state.RecentlySongs) {
      setAllSongs(JSON.stringify(this.state.RecentlySongs))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    BackHandler.exitApp();
  }

  handleSearch = () => {
    const { searchTerm, songs } = this.state;

    const filteredSongs = songs.filter(
      (song) => song.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ searchResults: filteredSongs });
  };

  handleRecentlyPlayed = (item) =>{
    const { RecentlySongs} = this.state;
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
    const { showSearchResults } = this.state;
    const { searchResults } = this.state;
    const songsToDisplay = searchResults.length > 0 ? searchResults : this.state.songs;

    
    if (!this.state.searchTerm || !showSearchResults) {
      return (
        <LinearGradient
          colors={['#29024f', '#000000', '#29024f']}
          style={styles.container}
          >
          <View style={styles.header}>
          <View style={stylesExplore.centeredButton}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfilePage', { previousRouteName: 'ExplorePage' })}>
              <Text style={styles.headerText}>
                {"  Profile Page "}
                <Image source={require('../images/up.png')} style={{ width: 30, height: 30 }} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

          <View style={stylesExplore.searchBar}>
            <Ionicons name="search-outline" size={24} color="gray" style={stylesExplore.searchIcon} />
            <TextInput
              placeholder="Search"
              style={stylesExplore.searchInput}
              value={this.state.searchTerm}
              onChangeText={(searchTerm) => this.setState({ searchTerm }, this.handleSearch)}
              onSubmitEditing={this.handleSearch}
            />
          </View>
          <View style={stylesExplore.body}>
            <Text style={stylesExplore.recentlyPlayed}>Recently Played</Text>
            <Text style={stylesExplore.seeAll} onPress={() => this.props.navigation.navigate('SeeAllPage',
                                                      { selectedItem: this.state.RecentlySongs,
                                                        type: "recently" })}>See All</Text>
          </View>
          <View style={stylesExplore.recentlyPlayedContainer}>
            <FlatList
              data={this.state.RecentlySongs.slice(0,2)}
              renderItem={({item}) => (
                <TouchableOpacity style={stylesExplore.recentlyPlayedItem} onPress={() => this.props.navigation.navigate('VideoReactionPage', { selectedItem: item })}>
                  <Image style={stylesExplore.recentlyPlayedImage} source={{uri : item.LinkToPreviewImage}} />
                  <View style={stylesExplore.songDetails}>
                    <Text style={stylesExplore.recentlyPlayedName}>{item.Title}</Text>
                    <Text style={stylesExplore.recentlyPlayedArtist}>{item.Uploader.Username}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => item._id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 20 }}
            />
          </View>
          <View style={stylesExplore.body}>
            <Text style={stylesExplore.heading}>Recommendation</Text>
            <Text style={stylesExplore.seeAll} onPress={() => this.props.navigation.navigate('SeeAllPage',
                                                      { selectedItem: songsToDisplay,
                                                        type: "all" })}>See All</Text>
          </View>
          <FlatList
            data={songsToDisplay.slice(0,7)}
            renderItem={({item}) =>(
              <View style={stylesExplore.songItem}>
                <Image style={stylesExplore.songImage} source={{uri : item.LinkToPreviewImage}} />
                <View style={stylesExplore.songDetails}>
                  <Text style={stylesExplore.songName}>{item.Title}</Text>
                  <Text style={stylesExplore.artistName}>{item.Uploader.Username}</Text>
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
}
