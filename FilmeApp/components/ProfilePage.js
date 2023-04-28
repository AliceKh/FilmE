import React from 'react';
import { View, Modal, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions} from 'react-native';
import axios from 'axios';

export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigate = props.navigation
        this.state = {
          selectedImageId: null,
          isMenuVisible: false,
          showList: true,
          user: null,
          songs: [], 
        };
        this.toggleList = this.toggleList.bind(this);
      }

      componentDidMount() {
        const userId = '64306b71dd045edb9b98d52d';
        axios.get(`http://localhost:4000/user/${userId}`)
          .then(response => {
            this.setState({ user: response.data });
          })
          .catch(error => {
            console.log(error);
          });
          
        axios.get('http://localhost:4000/uploads')
          .then(response => {
            this.setState({ songs: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      }

      renderItem = ({ item, index }) => {
        const column = index % 3;
        const itemWidth = Dimensions.get('window').width / 3 - 12;
      
        return (
          <TouchableOpacity
            style={[styles.itemContainer, column === 0 && styles.itemContainerFirstColumn, item.id === this.state.selectedImageId && styles.selectedItemContainer]}
            onPress={() => {
              this.setState({ selectedImageId: item.id }); 
              this.props.navigation.navigate('GraphPage');
            }}
          >
            <Image style={[styles.itemImage, { width: itemWidth }]} source={{ uri: item.LinkToPreviewImage }} />
          </TouchableOpacity>
        );
      }      

    toggleMenu = () => {
        this.setState({isMenuVisible: !this.state.isMenuVisible})
    }

    toggleList = () => {
      this.setState(prevState => ({
        showList: !prevState.showList,
      }));
    }

    renderMenu = () => {
        return (
          <Modal visible={this.state.isMenuVisible} transparent animationType="none">
            <TouchableOpacity style={{ flex: 1 }} onPress={this.toggleMenu}>
              <View style={{ flex: 1}}>
                <View style={{ position: 'absolute', top: 50, right: 2, width: 150, borderRadius: 8, padding: 16, backgroundColor: '#5e0362a3' }}>
                  <TouchableOpacity style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, color: 'white',textAlign: 'center' }}>Settings</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{ fontSize: 16, color: 'white',textAlign: 'center' }}>Help</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        );
    }

  render() {
    const { showList, user } = this.state;
    return (
      <View style={styles.body}>
        {/* Header section */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Image source={require('../images/previous.png')} 
                       style={{ width: 20, height: 20, color: 'white' }} />
            </TouchableOpacity>  
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ExplorePage')}>
            <Text style={ styles.headerText }>{"  Explore Page "}
              <Image source={require('../images/up.png')} style={{ width: 16, height: 16 }} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleMenu}>
            <Image source={require('../images/menu.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        {this.renderMenu()}

       {/* Profile picture section */}
       <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Image source={user && {uri : user.ProfileImage}} style={{ width: 120, height: 120, borderRadius: 60 }} />
          <Text style={ styles.profileName }>{user && user.Username}</Text>
        </View>

        {/* Followers, following, likes row */}
        <View style={[styles.centerStyle, {marginTop: 16 }]}>
          <View style={[{ alignItems: 'center' },{marginRight: 8}]}>
            <Text style={styles.infoStatic}>{user && user.NumberOfFollowing}</Text>
            <Text style={ styles.infoName }>Following</Text>
          </View>
          <View style={[{ alignItems: 'center' },{marginRight: 8}]}>
            <Text style={styles.infoStatic}>{user && user.NumberOfFollowers}</Text>
            <Text style={ styles.infoName }>Followers</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.infoStatic}>{user && user.NumberOfReactions}</Text>
            <Text style={ styles.infoName }>Reactions</Text>
          </View>
        </View>

        {/* Buttons section */}
        <View style={[styles.centerStyle, {marginVertical: 16, marginBottom: 20 }]}>
          <TouchableOpacity style={[styles.followBtn,{marginRight: 8}]}>
            <Text style={ styles.headerText }>Follow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconBtn,{marginRight: 8}]}>
            <Image source={require('../images/spotify.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image source={require('../images/down.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => this.setState({showList : true})}>
            <Image source={require('../images/grid.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({showList : false})} >
            <Image source={require('../images/alert.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>

        {/* Video list section */}
        {showList ? (
          <View style={styles.container}>
            <FlatList
              data={this.state.songs}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              numColumns={3}
            />
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{color: 'white'}}>Notifications</Text>
          </View>
        )}
    </View>
);
    }
}

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: 16
    },
    body:{
        flex: 1,
        backgroundImage: 'linear-gradient(to right, #29024f, #000000, #29024f)',
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
    selectedItemContainer: {
      borderWidth: 2,
      borderColor: '#2196f3',
    },
    itemImage: {
      flex: 1,
      width: 210,
      height: 235,
      aspectRatio: 1,
    },
    infoName:{
        fontSize: 16,
        color: 'gray'
    },
    infoStatic:{
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white'
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
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    iconBtn:{
        borderColor: '#686060', borderWidth: 1, borderRadius: 3
    },
  });