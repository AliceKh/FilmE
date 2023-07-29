import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity, Image, BackHandler } from 'react-native';

const SearchResultsPage = ({ searchData, navigation }) => {
const [showResults, setShowResults] = React.useState(true);

    // React.useEffect(() => {
    //     const handleBackPress = () => {
    //       // Navigate back to ExplorePage when back button is pressed
    //       navigation.navigate('ExplorePage');
    //       return true; // Prevent default back press behavior
    //     };
    
    //     // Add event listener for hardware back press
    //     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    //     // Remove event listener on component unmount
    //     return () => backHandler.remove();
    //   }, [navigation]);

  return (
    <View>
      <FlatList
        data={searchData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.songItem}
            onPress={() => {
              item.Type == 'video'
                ? navigation.navigate('VideoReactionPage', { selectedItem: item })
                : navigation.navigate('AudioReactionPage', { selectedItem: item });
            }}
          >
            <Image style={styles.songImage} source={{ uri: item.LinkToPreviewImage }} />
            <View style={styles.songDetails}>
              <Text style={styles.songName}>{item.Title}</Text>
              <Text style={styles.artistName}>{item.Uploader.Username}</Text>
            </View>
            <Image source={require('../images/right.png')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 40,
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
      color: 'black',
    },
    artistName: {
      fontSize: 14,
      color: 'gray',
    },
  });

export default SearchResultsPage;
