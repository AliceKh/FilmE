import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Modal, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, BackHandler} from 'react-native';
import GraphPage from './GraphPage';
import { getCurrentUser } from '../services/ProfileService';
import { getUsersUploads } from '../services/ProfileService';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigation;
    this.state = {
      selectedImageId: null,
      isMenuVisible: false,
      showList: true,
      user: null,
      songs: [],
      isGraphVisible: false,
    };
    this.toggleList = this.toggleList.bind(this);
  }

  componentDidMount() {
    getCurrentUser()
      .then(response => {
        this.setState({ user: response });
      })
      .catch(error => {
        console.log(error);
      });
      
    getUsersUploads()
      .then(response => {
        this.setState({ songs: response });
      })
      .catch(error => {
        console.log(error);
      });
      
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

  renderItem = ({ item, index }) => {
    const column = index % 3;
    const itemWidth = Dimensions.get('window').width / 3 - 12;

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          column === 0 && styles.itemContainerFirstColumn,
          item.id === this.state.selectedImageId && styles.selectedItemContainer,
        ]}
        onPress={() => {
          this.setState({ selectedImageId: item._id, isGraphVisible: true });
        }}
      >
        <Image style={[styles.itemImage, { width: itemWidth }]} source={{ uri: item.LinkToPreviewImage }} />
      </TouchableOpacity>
    );
  };

  toggleList = () => {
    this.setState((prevState) => ({
      showList: !prevState.showList,
    }));
  };

  renderGraphModal = () => {
    return (
      <Modal visible={this.state.isGraphVisible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.modalBackground}
          activeOpacity={1}
          onPress={() => this.setState({ isGraphVisible: false })}
        >
          <View style={styles.modalContent}>
            <GraphPage objectId={this.state.selectedImageId} onClose={() => this.setState({ isGraphVisible: false })} />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  render() {
    const { showList, user } = this.state;
    return (
      <LinearGradient
        colors={['#29024f', '#000000', '#29024f']}
        style={styles.body}
      >
        {/* Header section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ExplorePage', { previousRouteName: 'ProfilePage' })}>
            <Text style={ styles.headerText }>{"  Explore Page "}
              <Image source={require('../images/up.png')} style={{ width: 16, height: 16 }} />
            </Text>
          </TouchableOpacity>
        </View>

        {this.renderGraphModal()}

        {/* Profile picture section */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Image source={user && { uri: user.ProfileImage }} style={{ width: 120, height: 120, borderRadius: 60 }} />
          <Text style={styles.profileName}>{user && user.Username}</Text>
        </View>

        {/* Followers, following, likes row */}
        <View style={[styles.centerStyle, { marginTop: 16 }]}>
          <View style={[{ alignItems: 'center' }, { marginRight: 8 }]}>
            <Text style={styles.infoStatic}>{user && user.NumberOfFollowing}</Text>
            <Text style={styles.infoName}>Following</Text>
          </View>
          <View style={[{ alignItems: 'center' }, { marginRight: 8 }]}>
            <Text style={styles.infoStatic}>{user && user.NumberOfFollowers}</Text>
            <Text style={styles.infoName}>Followers</Text>
          </View>
          <View style={[{ alignItems: 'center' },{marginRight: 8}]}>
            <Text style={styles.infoStatic}>{user && user.NumberOfReactions}</Text>
            <Text style={styles.infoName}>Reactions</Text>
          </View>
        </View>

        {/* Buttons section */}
        <View style={[styles.centerStyle, {marginVertical: 16, marginBottom: 20 }]}>
          <TouchableOpacity onPress={() => {if(user) {this.props.navigation.navigate('UploadPage',
                                                     { previousRouteName: 'ProfilePage', userID: user._id})}}}
                            style={[styles.iconBtn,{ marginHorizontal: 25}]}>
            <Image source={require('../images/plus.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => this.setState({showList : true})}>
            <Image source={require('../images/grid.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ showList: false })}>
            <Image source={require('../images/alert.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        {/* Video list section */}
        {showList ? (
          <View style={styles.container}>
            <FlatList data={this.state.songs} renderItem={this.renderItem} keyExtractor={(item) => item.id} numColumns={3} />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white' }}>Notifications</Text>
          </View>
        )}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row-reverse',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: 25,
        paddingHorizontal: 10
    },
    body:{
        flex: 1,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    itemContainer: {
      flex: 1,
      margin: 4,
      borderRadius: 2,
      overflow: 'hidden',
      alignItems: 'center'
    },
    itemImage: {
      flex: 1,
      width: 210,
      height: 235,
      aspectRatio: 1,
    },
    infoName:{
        fontSize: 16,
        color: 'gray',
    },
    infoStatic:{
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
    },
    profileName:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 8,
        color: 'white',
    },
    headerText:{
        fontSize: 16,
        color: 'white'
    },
    followBtn:{
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16, 
        borderRadius: 20
    },
    centerStyle:{
        flexDirection: 'row-reverse', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    iconBtn:{
        borderColor: '#686060', borderWidth: 1, borderRadius: 3
    },
  });